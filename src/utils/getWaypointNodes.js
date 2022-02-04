export default function getWaypointNodes(waypoints) {
  return waypoints.map((waypoint) => ({
    ...waypoint,
    elem: document.querySelector(waypoint.elem),
  }));
}
