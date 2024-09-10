import { defineBackend } from '@aws-amplify/backend';
import { downloadData } from 'aws-amplify/storage';
import { auth } from './auth/resource';
import { data } from './data/resource';
import { storage } from './storage/resource';

defineBackend({
  auth,
  data,
  storage,
});


try {
  const result = downloadData({
    path: 'album/2024/1.jpg',
    options: {
      // Alternatively, provide bucket name from console and associated region
      bucket: {
        bucketName: 'amplify-d2x7let61n8fca-ma-amplifyteamdrivebucket28-90epohn8if9i',
        region: 'ap-southeast-1'
      }
    }
  }).result;
} catch (error) {
  console.log(`Error: ${error}`);
}