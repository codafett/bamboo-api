import mongoose from 'mongoose';

import versionSchema from './schemas/versionSchema';
import productSchema from './schemas/productSchema';

// export const User = mongoose.model('user', userSchema, 'user');
export const Version = mongoose.model('version', versionSchema, 'version');
export const Product = mongoose.model('product', productSchema, 'product');
