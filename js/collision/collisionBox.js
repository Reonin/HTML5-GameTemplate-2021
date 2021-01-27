// Simple Collision Detection
export function collides(a, b) {
  return a.x < b.x + b.width
             && a.x + a.width > b.x
             && a.y < b.y + b.height
             && a.y + a.height > b.y;
}
