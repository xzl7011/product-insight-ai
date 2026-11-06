const $ = (selector) => document.querySelector(selector);

let selectedRate = "";

// 点击「开始分析」
$("#analyze").onclick = async () => {
  const idea = $("#idea").value.trim();

  if (!idea) {
    alert("请输入产品想法");
    return;
  }

  $("#loading").classList.remove("hidden");
  $("#result").classList.add("hidden");

  try {
    const response = await fetch("/api/analyze", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ idea })
    });

    const data = await response.json();

    $("#loading").classList.add("hidden");

    const result = data.result;

    $("#result").innerHTML = `
      <h2>
        需求分析结果
        <span class="tag">MVP 演示模式</span>
      </h2>

      <h3>目标用户</h3>
      <p>${result.targetUsers}</p>

      <h3>核心痛点</h3>
      <ul>
        ${result.painPoints.map(item => `<li>${item}</li>`).join("")}
      </ul>

      <h3>功能优先级</h3>
      <ul>
        ${result.features.map(item => `
          <li><b>${item.priority}</b> · ${item.name}</li>
        `).join("")}
      </ul>

      <h3>用户故事</h3>
      <p>${result.userStory}</p>

      <h3>验收标准</h3>
      <ul>
        ${result.acceptance.map(item => `<li>${item}</li>`).join("")}
      </ul>
    `;

    $("#result").classList.remove("hidden");

  } catch (error) {
    $("#loading").classList.add("hidden");
    alert("分析服务暂时无法连接，请稍后再试。");
  }
};


// 选择用户满意度
document.querySelectorAll(".rate").forEach((button) => {
  button.onclick = () => {
    selectedRate = button.dataset.rate;

    document.querySelectorAll(".rate").forEach((item) => {
      item.style.outline = "";
    });

    button.style.outline = "3px solid #93c5fd";
  };
});


// 提交用户反馈
$("#sendFeedback").onclick = async () => {

  if (!selectedRate) {
    alert("请先选择满意度");
    return;
  }

  try {
    const response = await fetch("/api/feedback", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        rate: selectedRate,
        comment: $("#comment").value
      })
    });

    const data = await response.json();

    $("#feedbackMsg").textContent = data.message;

  } catch (error) {
    $("#feedbackMsg").textContent =
      "反馈暂时无法提交，请稍后再试。";
  }
};
