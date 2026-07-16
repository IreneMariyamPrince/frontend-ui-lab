document.addEventListener("DOMContentLoaded", () => {
  const terminalBody = document.getElementById("terminal-body");
  
  const commands = [
    { text: "npm start", delay: 1000 },
    { type: "output", text: "> Starting development server...", success: false },
    { type: "output", text: "> Compiled successfully!", success: true },
    { text: "whoami", delay: 1500 },
    { type: "output", text: "frontend-engineer", success: false },
    { text: "cat tech_stack.json", delay: 1000 },
    { type: "output", text: "{\n  \"frontend\": [\"React\", \"Vue\", \"Next.js\"],\n  \"styling\": [\"CSS\", \"Tailwind\", \"Sass\"],\n  \"backend\": [\"Node.js\", \"Express\"]\n}", success: false }
  ];

  let currentCommandIndex = 0;

  async function typeText(text, element, speed = 50) {
    for (let i = 0; i < text.length; i++) {
      element.innerHTML += text.charAt(i);
      await new Promise(r => setTimeout(r, speed));
    }
  }

  async function runTerminal() {
    for (const cmd of commands) {
      if (cmd.type === "output") {
        const outputDiv = document.createElement("div");
        outputDiv.className = `output ${cmd.success ? 'success' : ''}`;
        
        // Handle multiline output
        if (cmd.text.includes('\n')) {
            const pre = document.createElement("pre");
            pre.style.margin = "0";
            pre.textContent = cmd.text;
            outputDiv.appendChild(pre);
        } else {
            outputDiv.textContent = cmd.text;
        }
        
        terminalBody.insertBefore(outputDiv, terminalBody.lastChild);
        await new Promise(r => setTimeout(r, 500));
      } else {
        const line = document.createElement("div");
        line.innerHTML = `<span class="prompt">~</span><span class="command"></span>`;
        terminalBody.insertBefore(line, terminalBody.lastChild);
        
        const commandSpan = line.querySelector('.command');
        await typeText(cmd.text, commandSpan, 100);
        await new Promise(r => setTimeout(r, cmd.delay));
      }
    }
  }

  // Initialize cursor
  terminalBody.innerHTML = `<span class="cursor"></span>`;
  
  // Start sequence
  setTimeout(runTerminal, 1000);
});
