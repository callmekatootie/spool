/**
 * Source: https://www.reddit.com/r/javascript/comments/1j3aie/time_ago_in_words_simple_pretty_timestamps_for_js/cbao80i/
 */

export default function getTimeSince(datetime) {
  const now = Date.now();

  // datetime will be epoch time, hence the 1000 multipler to get milliseconds
  let difference = now - new Date(datetime * 1000);

  difference = Math.floor(difference / 1000);

  // Seconds
  if (difference < 60) {
    return `${difference}s`;
  }

  // Minutes
  difference = Math.floor(difference / 60);
  if (difference < 60) {
    return `${difference}m`;
  }

  // Hours
  difference = Math.floor(difference / 60);
  if (difference < 24) {
    return `${difference}h`;
  }

  // Days
  difference = Math.floor(difference / 24);
  if (difference < 7) {
    return `${difference}d`;
  }

  // Weeks - For everything else
  difference = Math.floor(difference / 7);
  return `${difference}w`;
}
