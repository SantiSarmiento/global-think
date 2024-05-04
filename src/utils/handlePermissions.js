import { check, PERMISSIONS, RESULTS, request } from 'react-native-permissions';

export const handleIOSPermissions = async () => {
    check(PERMISSIONS.IOS.CAMERA)
        .then((result) => {
            switch (result) {
                case RESULTS.DENIED:
                    request(PERMISSIONS.IOS.CAMERA).then((result) => {
                        console.log(result);
                    });
                    break;
                case RESULTS.BLOCKED:
                    console.log('The permission is denied and not requestable anymore');
                    break;
            }
        })
        .catch((error) => {
            // …
        });
};

export const handleAndroidPermissions = async () => {
    check(PERMISSIONS.ANDROID.CAMERA)
        .then((result) => {
            switch (result) {
                case RESULTS.DENIED:
                    request(PERMISSIONS.ANDROID.CAMERA).then((result) => {
                        console.log(result);
                    });
                    break;
                case RESULTS.BLOCKED:
                    console.log('The permission is denied and not requestable anymore');
                    break;
            }
        })
        .catch((error) => {
            // …
        });
};