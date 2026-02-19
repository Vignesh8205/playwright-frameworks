import fs from "fs";
import { FullResult, Reporter, TestCase, TestResult } from "@playwright/test/reporter";

class NativeTextReporter implements Reporter {
  private logs: string[] = [];

  onTestEnd(test: TestCase, result: TestResult) {
    const statusIcon = result.status === "passed" ? "✅" : "❌";
    const line = `${statusIcon} ${test.title} (${result.status.toUpperCase()})`;
    this.logs.push(line);
  }

  async onEnd(result: FullResult) {
    const output = [
      "===========================",
      "PLAYWRIGHT TEST REPORT",
      "===========================",
      `DATE: ${new Date().toLocaleString()}`,
      "---------------------------",
      ...this.logs,
      "---------------------------",
      `TOTAL: ${this.logs.length}`,
      `STATUS: ${result.status.toUpperCase()}`,
      "==========================="
    ].join("\n");

    if (!fs.existsSync("reports")) fs.mkdirSync("reports");
    fs.writeFileSync("reports/test-report.txt", output);
    console.log("\n✅ Report generated: reports/test-report.txt");
  }
}

export default NativeTextReporter;
