/* ==========================================================
   OptiVerse Academy — Course Catalog
   ----------------------------------------------------------
   Fields:
     title       — course name (as shown on card)
     description — short one-liner
     category    — "ai" or "energy"
     price       — number, USD
     rating      — number, out of 5
     url         — direct Udemy link
     theme       — cover color theme (see main.js: coverThemes)
                    options: pink | purple | teal | yellow | green
                             blue | coral | sunset | forest | midnight
     icon        — cover icon key (see main.js: coverIcons)
                    options: brain | rocket | chip | code | chart | flask
                             wind | building | bolt | leaf | gears | target
                             git | data | terminal | atom
   ========================================================== */

window.COURSES = [
  // ---------- AI, ML & Data ----------
  {
    title: "Vertex AI Pipelines: Production MLOps on Google Cloud",
    description: "Build, deploy, and orchestrate end-to-end MLOps pipelines on GCP with Vertex AI.",
    category: "ai",
    price: 199.99,
    rating: 4.5,
    theme: "purple",
    icon: "rocket",
    image: "course image/MLOps with VertexAI.png",
    url: "https://www.udemy.com/course/vertex-ai-pipelines-production-mlops-on-google-cloud/?referralCode=95A093C18760B59392C0"
  },
  {
    title: "Generative AI with Context: RAG, CAG & KAG Applications",
    description: "Design context-aware GenAI systems — Retrieval, Cache, and Knowledge-Augmented Generation.",
    category: "ai",
    price: 199.99,
    rating: 4.5,
    theme: "pink",
    icon: "brain",
    image: "course image/Generative AI with Context RAG, CAG & KAG Applications.png",
    url: "https://www.udemy.com/course/generative-ai-with-context-rag-cag-kag-applications/?referralCode=507F86F108331752DC72"
  },
  {
    title: "Data Engineering Bootcamp",
    description: "Full data engineering workflow — pipelines, warehousing, orchestration, and best practices.",
    category: "ai",
    price: 199.99,
    rating: 4.5,
    theme: "blue",
    icon: "data",
    image: "course image/Data Engineering Bootcamp.png",
    url: "https://www.udemy.com/course/data-engineering-bootcamp/?referralCode=8200FCC8407FAD9F345C"
  },
  {
    title: "Prompt Engineering for Everyone Bootcamp",
    description: "Master prompting for LLMs — from foundations to advanced production patterns.",
    category: "ai",
    price: 199.99,
    rating: 4.5,
    theme: "sunset",
    icon: "terminal",
    image: "course image/Prompt Engineering.png",
    url: "https://www.udemy.com/course/prompt-engineering-for-everyone-bootcamp/?referralCode=42E022658DF3E76CD881"
  },
  {
    title: "Integration and Deployment of GenAI Models",
    description: "Ship LLM-based apps to production — APIs, monitoring, scaling, and integration patterns.",
    category: "ai",
    price: 199.99,
    rating: 4.5,
    theme: "teal",
    icon: "chip",
    image: "course image/Integration and Deployment of GenAI models.png",
    url: "https://www.udemy.com/course/integration-and-deployment-of-genai-models/?referralCode=439439482D789CE4FB16"
  },
  {
    title: "Mastering Generative AI with PyTorch: Hands-on Experience",
    description: "Build generative models from scratch with PyTorch — GANs, VAEs, Transformers, and Diffusion.",
    category: "ai",
    price: 199.99,
    rating: 4.6,
    theme: "midnight",
    icon: "atom",
    image: "course image/Mastering Generative AI with PyTorch Hands-on Experience.jpg",
    url: "https://www.udemy.com/course/mastering-generative-ai-with-pytorch-hands-on-experience/?referralCode=EE491EE1D98990FC616C"
  },
  {
    title: "PyTorch for Deep Learning Bootcamp: Zero to Mastery",
    description: "A complete PyTorch journey — tensors, neural nets, CNNs, RNNs, and real projects.",
    category: "ai",
    price: 99.99,
    rating: 4.3,
    theme: "coral",
    icon: "flask",
    image: "course image/PyTorch for Deep Learning Bootcamp Zero to Mastery.jpg",
    url: "https://www.udemy.com/course/pytorch-for-deep-learning-bootcamp-zero-to-mastery/?referralCode=2F28686E4C7F6B8372AE"
  },
  {
    title: "Time Series Analysis and Forecasting with Python",
    description: "Statistical and ML approaches to time series — ARIMA, Prophet, LSTMs, and beyond.",
    category: "ai",
    price: 199.99,
    rating: 4.4,
    theme: "green",
    icon: "chart",
    image: "course image/Time Series Analysis.jpg",
    url: "https://www.udemy.com/course/time-series-analysis-and-forecasting-with-python/?referralCode=ABED3BECD59085E6CB93"
  },
  {
    title: "Machine Learning & Data Science A-Z: Hands-on Python 2024",
    description: "End-to-end ML workflow — from data prep to production models with Python.",
    category: "ai",
    price: 124.99,
    rating: 4.2,
    theme: "purple",
    icon: "code",
    image: "course image/Machine Learning.jpg",
    url: "https://www.udemy.com/course/machine-learning-data-science-a-z-hands-on-python/?referralCode=EC99B3519CFED8CA3321"
  },
  {
    title: "Mastering Git and GitHub Essentials: Hands-on Git",
    description: "Git and GitHub for developers, data scientists, and engineers — collaboration made easy.",
    category: "ai",
    price: 89.99,
    rating: 4.6,
    theme: "sunset",
    icon: "git",
    image: "course image/Git.jpg",
    url: "https://www.udemy.com/course/mastering-git-and-github-essentials-hands-on-git/?referralCode=AF972F175CA560059387"
  },

  // ---------- Energy & Optimization ----------
  {
    title: "EnergyPlus Essentials: Mastering Building Energy Simulation",
    description: "Start your EnergyPlus journey — building modeling, simulation, and analysis foundations.",
    category: "energy",
    price: 199.99,
    rating: 4.6,
    theme: "teal",
    icon: "building",
    image: "course image/EnergyPlus Essentials Mastering Building Energy Simulation.jpg",
    url: "https://www.udemy.com/course/energyplus-essentials-mastering-building-energy-simulation/?referralCode=6DC72EE1AF1B28C2AC50"
  },
  {
    title: "EnergyPlus Advanced: Complex Building Energy Simulation",
    description: "Advanced EnergyPlus workflows — HVAC, controls, calibration, and complex geometries.",
    category: "energy",
    price: 199.99,
    rating: 4.5,
    theme: "midnight",
    icon: "building",
    image: "course image/EnergyPlus Advanced Complex Building Energy Simulation.jpg",
    url: "https://www.udemy.com/course/energyplus-advanced-complex-building-energy-simulation/?referralCode=1AB709AEA995BCD434EB"
  },
  {
    title: "Wind Energy Modeling Bootcamp: Hands-on Python",
    description: "Model wind resources and turbine performance with Python — from theory to code.",
    category: "energy",
    price: 109.99,
    rating: 4.5,
    theme: "blue",
    icon: "wind",
    image: "course image/Wind Energy.png",
    url: "https://www.udemy.com/course/wind-energy-modeling-bootcamp-hands-on-python/?referralCode=A2C59DD54C5BA795F639"
  },
  {
    title: "Optimal Sizing of Hybrid Renewable Energy Systems with HOMER",
    description: "Design and size hybrid renewable systems (PV, wind, storage) using HOMER.",
    category: "energy",
    price: 54.99,
    rating: 4.5,
    theme: "green",
    icon: "leaf",
    image: "course image/Homer.jpg",
    url: "https://www.udemy.com/course/optimal-sizing-of-hybrid-renewable-energy-systems-with-homer/?referralCode=BECACF9660B504E39C4B"
  },
  {
    title: "Optimization with Python: Complete Pyomo Bootcamp A-Z",
    description: "Solve real-world optimization problems in Python using the Pyomo framework.",
    category: "energy",
    price: 199.99,
    rating: 4.7,
    theme: "coral",
    icon: "gears",
    image: "course image/Optimization with Python.jpg",
    url: "https://www.udemy.com/course/optimization-with-python-complete-pyomo-bootcamp-a-z/?referralCode=2365BB23F8D1CE368756"
  },
  {
    title: "Optimization with GAMS: Operations Research Bootcamp A-Z",
    description: "Master mathematical optimization and operations research modeling with GAMS.",
    category: "energy",
    price: 124.99,
    rating: 4.8,
    theme: "sunset",
    icon: "target",
    image: "course image/Optimization with GAMS.jpg",
    url: "https://www.udemy.com/course/optimization-with-gams-operations-research-bootcamp-a-z/?referralCode=E8090E1216308DCD5956"
  },
  {
    title: "Multi-Objective Optimization with Python Bootcamp A-Z",
    description: "Pareto fronts, NSGA-II, and multi-objective algorithms — implemented in Python.",
    category: "energy",
    price: 89.99,
    rating: 4.5,
    theme: "purple",
    icon: "target",
    image: "course image/Multi Objective Optimization.jpg",
    url: "https://www.udemy.com/course/multi-objective-optimization-with-python-bootcamp-a-z/?referralCode=C15B092F2938A215C364"
  },
  {
    title: "Optimization with Genetic Algorithms: Hands-on Python",
    description: "Genetic algorithms from scratch — theory, implementation, and real projects in Python.",
    category: "energy",
    price: 89.99,
    rating: 4.3,
    theme: "pink",
    icon: "flask",
    image: "course image/Optimization Genetic Algorithm.jpg",
    url: "https://www.udemy.com/course/optimization-with-genetic-algorithms-hands-on-python/?referralCode=243936B4C982A52D9687"
  }
];
