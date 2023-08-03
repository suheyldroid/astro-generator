import { spawn } from "child_process";

const withAsyncSpawn = async function (_eval: ReturnType<typeof spawn>) {
  return new Promise((resolve, reject) => {
    let error = "";
    let output = "";

    _eval.stdout?.on("data", (data) => {
      const outputData = data.toString();
      process.stdout.write(outputData);
      output += outputData;
    });
    _eval.stderr?.on("data", (data) => {
      error += data;
    });
    _eval.on("close", (code) => {
      if (code) {
        reject(error);
      } else {
        resolve(output);
      }
    });
  });
};

export { withAsyncSpawn };
