export function calculateMinutesAgo(timestampString) {
  const postDate = new Date(timestampString);
  const currentDate = new Date();
  const timeDifferenceMillis = currentDate - postDate;
  const minutesDifference = Math.floor(timeDifferenceMillis / (1000 * 60));
  return minutesDifference;
}
export function calculateHours(obj){
  const oldTime = obj.created;
  let newTime = Number(calculateMinutesAgo(oldTime));
  
  if(newTime > 60){
   newTime = Math.round(newTime / 60) + " hours ago"
  }else if(newTime > 1440) {
    newTime = Math.round((newTime / 60) / 24) + " days ago";
  } else if (newTime < 60){
    newTime = newTime + " minutes ago"
  }
  return newTime
}