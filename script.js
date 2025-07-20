function analyzeResume() {
  const input = document.getElementById("resumeInput");
  const results = document.getElementById("results");
  const skillsEl = document.getElementById("skills");
  const rolesEl = document.getElementById("roles");
  const scoreEl = document.getElementById("score");
  const tipsEl = document.getElementById("tips");

  if (!input.files.length) {
    alert("Please upload a resume file.");
    return;
  }

  const reader = new FileReader();

  reader.onload = function (e) {
    const text = e.target.result.toLowerCase();

    const skillKeywords = ["javascript", "python", "react", "node", "sql", "java", "html", "css", "machine learning", "aws", "docker"];
    const jobRoles = {
      developer: ["javascript", "react", "node", "html", "css"],
      dataScientist: ["python", "machine learning", "sql"],
      devOps: ["docker", "aws"]
    };

    const foundSkills = skillKeywords.filter(skill => text.includes(skill));
    const suggestedRoles = [];

    for (const role in jobRoles) {
      if (jobRoles[role].some(skill => foundSkills.includes(skill))) {
        suggestedRoles.push(role);
      }
    }

    const score = Math.min(100, foundSkills.length * 10);
    const tips = [];
    if (score < 70) tips.push("Add more relevant technical skills to increase your score.");
    if (!text.includes("project")) tips.push("Include a 'Projects' section with details.");
    if (!text.includes("experience")) tips.push("Mention past work or internship experiences.");

    skillsEl.textContent = foundSkills.join(", ") || "No major skills found.";
    rolesEl.textContent = suggestedRoles.join(", ") || "No matching roles found.";
    scoreEl.textContent = `${score}/100`;

    tipsEl.innerHTML = "";
    tips.forEach(tip => {
      const li = document.createElement("li");
      li.textContent = tip;
      tipsEl.appendChild(li);
    });

    results.classList.remove("hidden");
  };

  const file = input.files[0];
  if (file.type === "application/pdf") {
    alert("PDF support is limited. Please upload a .txt file for best results.");
  }

  reader.readAsText(file);
}
