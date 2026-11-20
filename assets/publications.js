/**
 * Curated publications, individually checked against the UvA profile, DBLP,
 * the author's CV, or publisher records as of 19 November 2026.
 * Maintain this list manually. It is NOT a live Google Scholar feed.
 * Category values: responsible-ai, explainable-ai, forecasting,
 * multi-agent, computer-vision, applied-ml.
 */
window.PUBLICATIONS = [
  {

    project:'code.html#project-01',
    id:'braa26', year:2026, type:'Journal article', selected:true, categories:['responsible-ai','explainable-ai','applied-ml'],
    pdf:"https://pure.uva.nl/ws/files/329110638/Intrinsic_interpretability_at_parity.pdf",
    title:'Intrinsic interpretability at parity: Attention-Based RL–MIL for student outcome prediction',
    authors:'N. M. Braakman, S. S. Mohammadi Ziabari, A. M. M. Alsahag, Y. N. Al Husaini',
    venue:'Natural Language Processing Journal, 14, 100204',
    url:'https://doi.org/10.1016/j.nlp.2026.100204',
    summary:'An interpretable reinforcement-learning and multiple-instance learning approach to educational outcome prediction.'
  },
  {

    project:'code.html#project-03',
    figure:'https://media.springernature.com/full/springer-static/image/art%3A10.1007%2Fs44379-026-00055-1/MediaObjects/44379_2026_55_Fig9_HTML.png', figureAlt:'Original Figure 9 from the North Atlantic Oscillation paper: red attribution heatmaps over the Atlantic and Europe', figureSource:'https://link.springer.com/article/10.1007/s44379-026-00055-1/figures/9', figureCredit:'Fig. 9 from Leneman et al. (2026), Machine Learning for Computational Science and Engineering. CC BY 4.0.',
    id:'lena26', year:2026, type:'Journal article', selected:true, categories:['explainable-ai','forecasting'],
    title:'Explainable AI for subseasonal forecasting of the North Atlantic Oscillation',
    authors:'T. Leneman, A. M. M. Alsahag, S. S. Mohammadi Ziabari',
    venue:'Machine Learning for Computational Science and Engineering, 2, article 6',
    url:'https://doi.org/10.1007/s44379-026-00055-1',
    summary:'Forecasting atmospheric variability while examining model explanations.'
  },
  {

    project:'code.html#project-05',
    id:'brak26', year:2026, type:'Journal article', selected:true, categories:['forecasting','applied-ml'],
    pdf:"https://ojs.ukscip.com/submissions_files/2/journals/5/articles/1709/697c5828f0c36.pdf",
    title:'Dynamic GNNs for predicting train cancellations on the Dutch railway network',
    authors:'B. Brakenhoff, A. M. M. Alsahag, S. S. Mohammadi Ziabari',
    venue:'Digital Technologies Research and Applications, 5(1), 32–52',
    url:'https://doi.org/10.54963/dtra.v5i1.1709',
    summary:'Graph-based learning from operational and environmental factors in railway networks.'
  },
  {

    project:'code.html#project-02',
    figure:'https://mdpi-res.com/information/information-17-00037/article_deploy/html/images/information-17-00037-g001.png', figureAlt:'Original Figure 1 from SG-MuRCL paper: the WSI graph, RL sampler and two MIL branches', figureSource:'https://www.mdpi.com/2078-2489/17/1/37', figureCredit:'Fig. 1 from Lin et al. (2026), Information. CC BY 4.0.',
    id:'lin26', year:2026, type:'Journal article', selected:true, categories:['computer-vision','applied-ml'],
    pdf:"https://pure.uva.nl/ws/files/302804832/SG-MuRCL.pdf",
    title:'SG-MuRCL: Smoothed graph-enhanced multi-instance contrastive learning for robust whole-slide image classification',
    authors:'B. Y. Lin, S. S. Mohammadi Ziabari, Y. N. Al Husaini, A. M. M. Alsahag',
    venue:'Information, 17(1), article 37',
    url:'https://doi.org/10.3390/info17010037',
    summary:'Graph-based multiple-instance learning for pathology image classification.'
  },
  {

    project:'code.html#project-02',
    id:'ahma26', year:2026, type:'Journal article', selected:true, categories:['computer-vision','explainable-ai','applied-ml'],
    title:'Explainable feature selection combining particle swarm optimisation with adaptive LASSO for MRI radiogenomics: Predicting HPV status in oropharyngeal cancer',
    authors:'M. Ahmadian, Z. Bodalal, M. Adib, S. S. Mohammadi Ziabari, et al.',
    venue:'Computer Methods and Programs in Biomedicine, 275, 109204',
    url:'https://doi.org/10.1016/j.cmpb.2025.109204',
    summary:'Feature selection and interpretability in medical imaging and radiogenomics.'
  },
  {

    project:'code.html#project-06',
    id:'bakk26', year:2026, type:'Conference paper', selected:false, categories:['applied-ml'],
    title:'Addressing label scarcity: Hybrid anomaly detection in mental healthcare billing',
    authors:'S. Bakker, Y. Ma, S. S. Mohammadi Ziabari',
    venue:'Information Integration and Web Intelligence (iiWAS 2025), LNCS 16330, pp. 112–126',
    url:'https://doi.org/10.1007/978-3-032-11976-6_8',
    summary:'Combining approaches to detect anomalies when labeled examples are limited.'
  },
  {

    code:'https://github.com/SahandZiabari/Task-Adaptive-Debiasing-with-SCM-for-Sentiment-Analysis',
    codeLabel:'GitHub fork',
    codeNote:'Paper-titled fork observed on the account; verify the repository after username change.',
    project:'code.html#project-01',
    figure:'https://media.springernature.com/m312/springer-static/image/art%3A10.1007%2Fs44379-025-00043-x/MediaObjects/44379_2025_43_Fig2_HTML.png', figureAlt:'Original Figure 2 from task-adaptive SCM debiasing paper: transformer, bias classifier and sentiment module', figureSource:'https://link.springer.com/article/10.1007/s44379-025-00043-x', figureCredit:'Fig. 2 from Zhu et al. (2025), Machine Learning for Computational Science and Engineering. Preprint CC BY 4.0.',
    id:'zhu25', year:2025, type:'Journal article', selected:true, categories:['responsible-ai','explainable-ai'],
    pdf:"https://assets-eu.researchsquare.com/files/rs-7624272/v1_covered_6666f040-9ef5-4e79-b8e5-52b234305484.pdf",
    pdfLabel:"Preprint PDF",
    title:'Task-adaptive debiasing with SCM for sentiment analysis',
    authors:'C. Zhu, S. S. Mohammadi Ziabari, A. M. M. Alsahag',
    venue:'Machine Learning for Computational Science and Engineering, 1(2), article 41',
    url:'https://doi.org/10.1007/s44379-025-00043-x',
    summary:'Uses warmth and competence signals to adapt how strongly sentiment models are debiased for each instance.'
  },
  {

    project:'code.html#project-01',
    id:'nar25', year:2025, type:'Preprint', selected:false, categories:['responsible-ai','applied-ml'],
    title:'Fairness Metric Design Exploration in Multi-Domain Moral Sentiment Classification using Transformer-Based Models',
    authors:'B. Naranbat, S. S. Mohammadi Ziabari, Y. N. Al Husaini, A. M. M. Alsahag',
    venue:'arXiv:2510.11222 (preprint)',
    url:'https://arxiv.org/abs/2510.11222',
    pdf:'https://arxiv.org/pdf/2510.11222',
    summary:'Explores fairness metrics under domain shift for transformer-based sentiment classification.'
  },
  {

    project:'code.html#project-03',
    figure:'https://mdpi-res.com/sustainability/sustainability-17-07192/article_deploy/html/images/sustainability-17-07192-g006.png', figureAlt:'Original Figure 6 from the Netherlands electricity forecasting study: yearly renewable energy production time series', figureSource:'https://www.mdpi.com/2071-1050/17/16/7192', figureCredit:'Fig. 6 from Ashtar et al. (2025), Sustainability. CC BY 4.0.',
    id:'asht25', year:2025, type:'Journal article', selected:true, categories:['forecasting','applied-ml'],
    title:'Hybrid forecasting for sustainable electricity demand in the Netherlands using SARIMAX, SARIMAX-LSTM, and sequence-to-sequence deep learning models',
    authors:'D. Ashtar, S. S. Mohammadi Ziabari, A. M. M. Alsahag',
    venue:'Sustainability, 17(16), article 7192',
    url:'https://doi.org/10.3390/su17167192',
    summary:'Compares statistical and deep-learning models for electricity demand forecasting.'
  },
  {

    project:'code.html#project-03',
    id:'chenj25', year:2025, type:'Journal article', selected:true, categories:['forecasting','explainable-ai'],
    pdf:"https://pure.uva.nl/ws/files/272490812/1-s2.0-S277266222500116X-main.pdf",
    title:'An analytics framework for interpretable subseasonal forecasting under decadal climate variability',
    authors:'J. Chen, A. M. M. Alsahag, S. S. Mohammadi Ziabari',
    venue:'Decision Analytics Journal, 17, 100660',
    url:'https://doi.org/10.1016/j.dajour.2025.100660',
    summary:'Interpretable forecasting across changes in decadal climate conditions.'
  },
  {

    project:'code.html#project-06',
    id:'chenx25', year:2025, type:'Journal article', selected:false, categories:['applied-ml'],
    title:'Efficient sparse MLPs through motif-level optimization under resource constraints',
    authors:'X. Chen, H. Liu, S. S. Mohammadi Ziabari',
    venue:'AI, 6(10), article 266',
    url:'https://doi.org/10.3390/ai6100266',
    summary:'Explores neural network architecture optimization with computational constraints.'
  },
  {

    project:'code.html#project-03',
    id:'curi25', year:2025, type:'Journal article', selected:false, categories:['forecasting','applied-ml'],
    title:'Integrating climate and economic predictors in hybrid Prophet–(Q)LSTM models for sustainable national energy demand forecasting',
    authors:'R. Curiël, A. M. M. Alsahag, S. S. Mohammadi Ziabari',
    venue:'Sustainability, 17(19), article 8687',
    url:'https://doi.org/10.3390/su17198687',
    summary:'Energy demand forecasting that accounts for both economic and climate variables.'
  },
  {

    project:'code.html#project-04',
    id:'sype25', year:2025, type:'Journal article', selected:false, categories:['multi-agent','applied-ml'],
    title:'Effects of unplanned incoming flights on airport relief processes after a major natural disaster',
    authors:'L. van de Sype, M. Vert, A. Sharpanskykh, S. S. Mohammadi Ziabari',
    venue:'Aerospace, 12(10), article 857',
    url:'https://doi.org/10.3390/aerospace12100857',
    summary:'Simulation of operational challenges in post-disaster airport relief.'
  },
  {

    project:'code.html#project-05',
    id:'tigh25', year:2025, type:'Conference paper', selected:false, categories:['applied-ml','multi-agent'],
    title:'The integration of federated learning techniques in predictive aircraft maintenance using cloud services',
    authors:'K. Tigchelaar, S. S. Mohammadi Ziabari, J. Mulder',
    venue:'Knowledge Management and Acquisition for Intelligent Systems, LNCS 15372',
    url:'https://doi.org/10.1007/978-981-96-0026-7_16',
    summary:'Federated machine learning for aircraft maintenance applications.'
  },
  {

    project:'code.html#project-06',
    id:'cool25', year:2025, type:'Conference paper', selected:false, categories:['computer-vision','applied-ml'],
    title:'Vision Transformer approach to customer churn prediction: Radar chart image classification for non-subscription e-commerce',
    authors:'S. Coolwijk, S. S. Mohammadi Ziabari, F. Angileri',
    venue:'Information Integration and Web Intelligence, LNCS 15343',
    url:'https://doi.org/10.1007/978-3-031-78093-6_6',
    summary:'An image-based representation of customer behavior for churn prediction.'
  },
  {

    project:'code.html#project-04',
    id:'bosc24', year:2024, type:'Conference paper', selected:false, categories:['multi-agent','explainable-ai'],
    title:'Towards a better understanding of agent-based airport terminal operations using surrogate modeling',
    authors:'B. C. D. de Bosscher, S. S. Mohammadi Ziabari, A. Sharpanskykh',
    venue:'Multi-Agent-Based Simulation XXIV, LNCS 14558, pp. 16–29',
    url:'https://doi.org/10.1007/978-3-031-61034-9_2',
    summary:'Makes agent-based airport models easier to analyze with surrogate approaches.'
  },
  {

    project:'code.html#project-03',
    id:'sand24', year:2024, type:'Journal article', selected:false, categories:['forecasting','applied-ml'],
    title:'Enhancing the predictability of wintertime energy demand in the Netherlands using ensemble model Prophet-LSTM',
    authors:'S. N. P. van de Sande, A. M. M. Alsahag, S. S. Mohammadi Ziabari',
    venue:'Processes, 12(11), article 2519',
    url:'https://doi.org/10.3390/pr12112519',
    summary:'Hybrid forecasting for seasonal energy demand.'
  },
  {

    researchSoftware:'https://github.com/StefJanssen/AATOM',
    researchSoftwareLabel:'AATOM simulator (research platform)',
    project:'code.html#project-04',
    id:'boss23', year:2023, type:'Journal article', selected:true, categories:['multi-agent','explainable-ai'],
    title:'A comprehensive study of agent-based airport terminal operations using surrogate modeling and simulation',
    authors:'B. C. D. de Bosscher, S. S. Mohammadi Ziabari, A. Sharpanskykh',
    venue:'Simulation Modelling Practice and Theory, 128, 102811',
    url:'https://doi.org/10.1016/j.simpat.2023.102811',
    summary:'An investigation of interpretable surrogate models for airport terminal simulation.'
  },
  {

    project:'code.html#project-06',
    id:'chik23', year:2023, type:'Journal article', selected:false, categories:['applied-ml'],
    pdf:"https://pure.uva.nl/ws/files/306357045/jrfm-16-00327.pdf",
    title:'A comparative study of traditional, ensemble and neural network-based natural language processing algorithms',
    authors:'A. Chikhi, S. S. Mohammadi Ziabari, J. W. van Essen',
    venue:'Journal of Risk and Financial Management, 16(7), article 327',
    url:'https://doi.org/10.3390/jrfm16070327',
    summary:'Empirical comparisons of NLP model families.'
  },
  {

    researchSoftware:'https://github.com/StefJanssen/AATOM',
    researchSoftwareLabel:'AATOM simulator (research platform)',
    project:'code.html#project-04',
    id:'lee23', year:2023, type:'Conference paper', selected:false, categories:['multi-agent','applied-ml'],
    title:'Surrogate modeling of agent-based airport terminal operations',
    authors:'B. de Leeuw, S. S. Mohammadi Ziabari, A. Sharpanskykh',
    venue:'Multi-Agent-Based Simulation XXIII, LNCS 13743, pp. 82–94',
    url:'https://doi.org/10.1007/978-3-031-22947-3_7',
    summary:'Efficient modeling of computationally intensive passenger and airport simulations.'
  },
  {

    project:'code.html#project-04',
    id:'jans22', year:2022, type:'Conference paper', selected:false, categories:['multi-agent','explainable-ai'],
    title:'Using causal discovery to design agent-based models',
    authors:'S. Janssen, A. Sharpanskykh, S. S. Mohammadi Ziabari',
    venue:'Multi-Agent-Based Simulation XXII, LNCS 13128, pp. 15–28',
    url:'https://doi.org/10.1007/978-3-030-94548-0_2',
    summary:'Exploring causal discovery to support the structure of agent-based models.'
  },
  {

    project:'code.html#project-04',
    id:'meki21', year:2021, type:'Journal article', selected:true, categories:['multi-agent'],
    title:'Systemic agent-based modeling and analysis of passenger discretionary activities in airport terminals',
    authors:'A. Mekić, S. S. Mohammadi Ziabari, A. Sharpanskykh',
    venue:'Aerospace, 8(6), article 162',
    url:'https://doi.org/10.3390/aerospace8060162',
    summary:'Simulating passenger decisions and behavior in airport terminals.'
  },
  {

    id:'hormone19', year:2019, type:'Conference paper', selected:false, categories:['multi-agent','applied-ml'],
    title:'A cognitive temporal-causal network model of hormone therapy',
    authors:'S. S. Mohammadi Ziabari',
    venue:'Computational Collective Intelligence, LNCS 11683',
    url:'https://doi.org/10.1007/978-3-030-28377-3_54',
    summary:'Temporal-causal modeling of cognitive and biological mechanisms.'
  },
  {

    id:'fluox19', year:2019, type:'Conference paper', selected:false, categories:['multi-agent','applied-ml'],
    title:'An adaptive temporal-causal network model for stress extinction using fluoxetine',
    authors:'S. S. Mohammadi Ziabari',
    venue:'Artificial Intelligence Applications and Innovations, IAICT 559, pp. 107–119',
    url:'https://doi.org/10.1007/978-3-030-19823-7_8',
    summary:'A computational temporal-causal model exploring processes related to stress.'
  },
  {

    id:'emotion18', year:2018, type:'Journal article', selected:false, categories:['multi-agent','applied-ml'],
    title:'Computational analysis of gender differences in coping with extreme stressful emotions',
    authors:'S. S. Mohammadi Ziabari, J. Treur',
    venue:'Procedia Computer Science, 145, pp. 376–385',
    url:'https://doi.org/10.1016/j.procs.2018.11.088',
    summary:'Adaptive temporal-causal modeling of coping responses under extreme stress.'
  }
];
