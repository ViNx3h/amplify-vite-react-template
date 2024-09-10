import { defineBackend } from '@aws-amplify/backend';
import { downloadData } from 'aws-amplify/storage';
import { auth } from './auth/resource';
import { data } from './data/resource';
import { firstBucket, secondBucket, storage } from './storage/resource';


defineBackend({
  auth,
  data,
  firstBucket,
  secondBucket,
  storage,
});
try {
  const result = downloadData({
    path: 'album/2024/1.jpg',
    options: {
      // Alternatively, provide bucket name from console and associated region
      bucket: {
        bucketName: 'second-bucket-name-from-console',
        region: 'us-east-2'
      }
    }
  }).result;
} catch (error) {
  console.log(`Error: ${error}`);
}