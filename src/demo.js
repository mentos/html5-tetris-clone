export default function demo(startX, startY, len, angle, branchWidth, ctx) {
  ctx.lineWidth = branchWidth;
  ctx.strokeStyle = "pink";

  ctx.beginPath();
  ctx.save();

  ctx.translate(startX, startY);
  ctx.rotate((angle * Math.PI) / 180);
  ctx.moveTo(0, 0);
  ctx.lineTo(0, -len);
  ctx.stroke();

  if (len < 10) {
    ctx.restore();
    return;
  }

  demo(0, -len, len * 0.8, angle - 15, branchWidth * 0.8, ctx);
  demo(0, -len, len * 0.8, angle + 15, branchWidth * 0.8, ctx);

  ctx.restore();
}
