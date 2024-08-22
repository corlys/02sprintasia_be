export default function logWithFormat(...args: unknown[]): void {
  console.log(`========================================`);
  args.forEach((arg) => console.log(arg));
  console.log(`========================================`);
}
