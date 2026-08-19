const { execFileSync } = require('node:child_process');

const result = execFileSync('npm', ['audit', '--omit=dev', '--audit-level=high', '--json'], {
  encoding: 'utf8',
  stdio: ['ignore', 'pipe', 'pipe'],
});

const report = JSON.parse(result);
const high = report.metadata?.vulnerabilities?.high ?? 0;
const critical = report.metadata?.vulnerabilities?.critical ?? 0;

if (high || critical) {
  console.error(`Security audit failed: ${critical} critical, ${high} high vulnerabilities.`);
  process.exit(1);
}

console.log('No high or critical production dependency vulnerabilities found.');
