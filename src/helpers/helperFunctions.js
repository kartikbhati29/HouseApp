export const sendNotificationToAdmin = () => {
  // send notification to admin
};

export const sendNotificationToUser = () => {
  // send local notification to user
};

export const formatDistance = (distance) => {
  if (distance > 10000) {
    return Number(distance / 10000).toFixed(2);
  }
  return distance;
};
