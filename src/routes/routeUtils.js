export const wrap = function(fn) {
  return function(req, res, next) {
      return fn(req, res, next).catch(function(err) {
          return next(err);
      });
  };
};