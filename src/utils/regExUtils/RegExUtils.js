import assert from 'assert';

export const PUNCTUATION_CHARACTERS = "[.,;:@`']";

const RegExUtils = () => ({
  escapeRegExpValue: function escapeRegExpValue(valueToEscape) {
    return valueToEscape
      ? valueToEscape.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
      : ''; // $& means the whole matched string
  },

  test(regExString, valueToTestAgainst, options) {
    let result = !regExString && !valueToTestAgainst;
    if (!result && !!regExString && !!valueToTestAgainst) {
      const regex = new RegExp(regExString, options);
      result = regex.test(valueToTestAgainst);
    }
    return result;
  },

  startsWithAny(valueToFind, valueToTestAgainst, options) {
    let result = false;
    if (!!valueToFind && !!valueToTestAgainst) {
      const regex = new RegExp(`^${valueToFind}`, options);
      result = regex.test(valueToTestAgainst);
    }
    return result;
  },

  startsWithValue(valueToFind, valueToTestAgainst, options) {
    return this.startsWithAny(
      this.escapeRegExpValue(valueToFind),
      valueToTestAgainst,
      options
    );
  },

  matchInWord(valueToFind, valueToTestAgainst, options) {
    let result = !valueToFind && !valueToTestAgainst;
    if (!result && !!valueToFind && !!valueToTestAgainst) {
      const regex = new RegExp(
        `${this.escapeRegExpValue(valueToFind)}`,
        options
      );
      result = regex.test(valueToTestAgainst);
    }
    return result;
  },

  matchInWordCaseSensitive(valueToFind, valueToTestAgainst, options = '') {
    return this.matchInWord(
      valueToFind,
      valueToTestAgainst,
      options.replace('i', '')
    );
  },

  matchInWordCaseInsensitive(valueToFind, valueToTestAgainst, options = '') {
    let searchOptions = options;
    if (searchOptions.split().indexOf('i') < 0) {
      searchOptions = `${options}i`;
    }
    return this.matchInWord(valueToFind, valueToTestAgainst, searchOptions);
  },

  matchWholeWord: function matchWholeWord(
    valueToFind,
    valueToTestAgainst,
    options
  ) {
    let result = !valueToFind && !valueToTestAgainst;
    if (!result && !!valueToFind && !!valueToTestAgainst) {
      const regex = new RegExp(
        `^${this.escapeRegExpValue(valueToFind)}$`,
        options
      );
      result = regex.test(valueToTestAgainst);
    }
    return result;
  },

  matchWholeWordCaseSensitive: function matchWholeWordCaseSensitive(
    valueToFind,
    valueToTestAgainst,
    options = ''
  ) {
    return this.matchWholeWord(
      valueToFind,
      valueToTestAgainst,
      options.replace('i', '')
    );
  },

  matchWholeWordCaseInsensitive: function matchWholeWordCaseInsensitive(
    valueToFind,
    valueToTestAgainst,
    options = ''
  ) {
    let searchOptions = options;
    if (searchOptions.split().indexOf('i') < 0) {
      searchOptions = `${options}i`;
    }
    return this.matchWholeWord(valueToFind, valueToTestAgainst, searchOptions);
  },

  matchIds(idToFind, idToTestAgainst) {
    return this.matchWholeWordCaseInsensitive(idToFind, idToTestAgainst);
  },

  getMatches: function getMatches(regExp, valueToTestAgainst) {
    assert(regExp, 'regExp required');
    let result = [];
    if (valueToTestAgainst) {
      const matches = valueToTestAgainst.matchAll(regExp);

      result = Array.from(matches);

      result = result.map((match) => {
        const groups = [];
        for (let index = 1; index < match.length; index += 1) {
          groups.push(match[index]);
        }
        return {
          match,
          fullMatch: match[0],
          groups,
        };
      }, []);
    }
    return result;
  },

  getGroups: function getGroups(regExp, valueToTestAgainst) {
    assert(regExp, 'regExp required');
    let result = [];
    if (valueToTestAgainst) {
      const matches = this.getMatches(regExp, valueToTestAgainst);
      result = matches.reduce(
        (groups, match) => [...groups, ...match.groups],
        []
      );
    }
    return result;
  },

  getValuesBetween: function getValuesBetween(
    startCharacter,
    endCharacter,
    valueToTestAgainst,
    options = 'g'
  ) {
    assert(
      startCharacter || endCharacter,
      'startCharacter OR endCharacter required'
    );

    let result = [];
    if (valueToTestAgainst) {
      const regExp = new RegExp(
        `${this.escapeRegExpValue(startCharacter)}(.*?)${this.escapeRegExpValue(
          endCharacter
        )}`,
        options
      );

      result = this.getGroups(regExp, valueToTestAgainst);
    }

    return result;
  },

  getFirstValueBetween: function getLastValueBetween(
    startCharacter,
    endCharacter,
    valueToTestAgainst,
    options = 'g'
  ) {
    const results = this.getValuesBetween(
      startCharacter,
      endCharacter,
      valueToTestAgainst,
      options
    );
    let result;
    if (results && results.length) {
      [result] = results;
    }
    return result;
  },

  getLastValueBetween: function getLastValueBetween(
    startCharacter,
    endCharacter,
    valueToTestAgainst,
    options = 'g'
  ) {
    const results = this.getValuesBetween(
      startCharacter,
      endCharacter,
      valueToTestAgainst,
      options
    );
    let result;
    if (results && results.length) {
      result = results[results.length - 1];
    }
    return result;
  },

  getLastSegmentFromUrlOrFileName: function getLastSegmentFromUrlOrFileName(
    url
  ) {
    const regEx = /[^\\|^/]+(?=\/$|$)/;
    const [result] = url.match(regEx);
    return result;
  },

  isJSONDateString(testString) {
    const regEx = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*))(?:Z|(\+|-)([\d|:]*))?$/;
    return regEx.test(testString);
  },

  replaceWhiteSpaces(testString, substitute) {
    assert(testString || testString === '', 'testString is required');
    assert(substitute || substitute === '', 'substitute is required');
    const regEx = /[\n\r]+|[\s]{1,}/g;
    return testString ? testString.replace(regEx, substitute) : testString;
  },

  replaceExcessWhiteSpaces(testString, substitute) {
    assert(testString || testString === '', 'testString is required');
    assert(substitute || substitute === '', 'substitute is required');
    const regEx = /[\n\r]+|[\s]{2,}/g;
    return testString ? testString.replace(regEx, substitute) : testString;
  },
});

export default RegExUtils();
