---
title: null
description: "The Genizah Jigsaw: human–AI collaboration for historical manuscript join discovery, Sara Valls Navarro’s MPhil research at Cambridge."
permalink: /research/
classes:
  - wide
  - research-page
---

<div class="research-layout">
  <aside class="research-contents">
    <nav aria-label="Research sections">
      <ol>
        <li><a href="#genizah-jigsaw" aria-current="location"><span class="research-contents__number" aria-hidden="true">01</span><span>The Genizah Jigsaw</span></a></li>
        <li><a href="#methodology"><span class="research-contents__number" aria-hidden="true">02</span><span>Methodology</span></a></li>
        <li><a href="#join-problem"><span class="research-contents__number" aria-hidden="true">03</span><span>The Join Problem</span></a></li>
        <li><a href="#retrieving-candidate-joins"><span class="research-contents__number" aria-hidden="true">04</span><span>Retrieving Candidate Joins</span></a></li>
        <li><a href="#genidaat"><span class="research-contents__number" aria-hidden="true">05</span><span>Genida’at: An Interface for Join Discovery</span></a></li>
      </ol>
    </nav>
  </aside>

  <div class="research-story">
    <header class="research-header">
      <h1 id="research-heading" class="bio__eyebrow">Research</h1>
      <a class="research-thesis-link" href="https://drive.google.com/file/d/1f63JcBByUEnj4Q4bZbJxVZQWwxJD1nya/view?usp=sharing">Read the full Dissertation <span aria-hidden="true">↗</span></a>
    </header>

    <section id="genizah-jigsaw" class="research-section" aria-labelledby="genizah-jigsaw-heading">
      <h2 id="genizah-jigsaw-heading">The Genizah Jigsaw</h2>
      <div class="genizah-intro">
      <figure class="research-figure genizah-intro__portrait">
        <img src="{{ '/assets/images/research/solomon-schechter.jpg' | relative_url }}" alt="Solomon Schechter seated at a table in Cambridge, surrounded by piles of manuscript fragments in 1898." width="1200" height="1059">
        <figcaption>Solomon Schechter at work in Cambridge, 1898. Cambridge University Library, via <a href="https://artsandculture.google.com/asset/solomon-schechter-at-work-in-cambridge-cambridge-university-library/1gFAH8WCN2YE-A">Google Arts &amp; Culture</a>.</figcaption>
      </figure>
      <p>Medieval manuscript collections have become fragmented and dispersed across institutions worldwide through damage and the sale and resale of fragments. The <a href="https://www.cam.ac.uk/stories/discarded-history-treasures-of-the-cairo-genizah">Cairo Genizah</a> is no exception: estimated to contain around 400,000 fragments, it is one of the most important collections for the study of medieval Jewish history. Generations of scholars have been trying to solve this jigsaw by making joins, that is, identifying two or more fragments that belonged to the same original work. As Schechter himself put it, this work “is not for one man, and not for one generation”.</p>
      </div>
    </section>

    <section id="methodology" class="research-section" aria-labelledby="methodology-heading">
      <h2 id="methodology-heading">Methodology</h2>
      <p>I followed a participatory design approach, grounding the technical work in the practices and needs of expert scholars. The research was structured in three connected phases:</p>
      {% include methodology-diagram.html %}
    </section>

    <section id="join-problem" class="research-section" aria-labelledby="join-problem-heading">
      <h2 id="join-problem-heading">The Join Problem</h2>
      {% include join-process.html %}
      <p>Through a formative study conducted with <strong>5 scholars</strong>, I identified two stages in the join discovery process:</p>
      <ol class="join-stages">
        <li><strong>Discovery:</strong> finding promising candidates within the collection.</li>
        <li><strong>Confirmation:</strong> examining visual cues to confirm or discard a join.</li>
      </ol>
      {% include join-explorer.html %}
    </section>

    <section id="retrieving-candidate-joins" class="research-section" aria-labelledby="retrieving-candidate-joins-heading">
      <h2 id="retrieving-candidate-joins-heading">Retrieving Candidate Joins</h2>
      {% include retrieval-pipeline.html %}
      <p>Because no dataset or benchmark was available for this task, I curated <strong>10,153 fragments in 3,593 expert-labelled join groups</strong>, with 24,057 images across six collections. The dataset brings together join records from the Princeton Geniza Project and Friedberg Genizah Project, plus two codex reconstructions supplied by Cambridge’s Genizah Research Unit.</p>
      <p>To suggest potential joins, the pipeline matches handwriting by visual similarity. Images are first preprocessed to locate lines and ink, exclude photographic backgrounds, and extract overlapping patches of handwriting. A frozen <a href="https://ai.meta.com/research/dinov3/">DINOv3</a> ViT-L/16 vision foundation model encodes each patch. Foreground features from all images of a fragment are pooled and encoded with VLAD into a single descriptor; cosine similarity between these descriptors produces the ranked candidates.</p>

      <h3 class="retrieval-results-title">How much of a codex can be recovered?</h3>
      <p>A scholar can continue the search by using each confirmed join as a new query. The plot below shows the <strong>share of recorded fragments recovered</strong> through this iterative process for two held-out codices: <em>Phoenix</em> (90 fragments) and <em>Prophets</em> (39 fragments).</p>
      <figure class="research-figure retrieval-results-figure">
        <div class="retrieval-results-figure__plot"><img src="{{ '/assets/images/research/retrieval-codex-recall.svg' | relative_url }}" alt="Traversal recall for two held-out codices. Reviewing the top 10 candidates per query recovers 58.0% of Phoenix and 26.7% of Prophets. Reviewing the top 100 recovers 97.8% and 90.0%, respectively." width="304" height="216" loading="lazy"></div>
      </figure>
      <p>Here, <strong>k = 10</strong> means reviewing the first 10 candidates for each query; <strong>k = 100</strong> means reviewing the first 100. At the larger review depth, mean recall reaches <strong>97.8% for Phoenix and 90.0% for Prophets</strong>. These experiments average over different starting fragments and assume every surfaced, recorded join is recognised, giving an upper-bound estimate of what the review workflow could recover.</p>
      <p class="retrieval-chapter-link">See <a href="https://drive.google.com/file/d/1f63JcBByUEnj4Q4bZbJxVZQWwxJD1nya/view?usp=sharing">Chapter 5 of the dissertation</a> for the dataset, experimental setup, baseline comparisons and complete results.</p>
    </section>

    <section id="genidaat" class="research-section" aria-labelledby="genidaat-heading">
      <h2 id="genidaat-heading">Genida’at: An Interface for Join Discovery</h2>
      <p>Genida’at takes its name from the Hebrew words <em>genizah</em>, “repository”, and <em>da’at</em>, “knowledge”. I integrated the retrieval pipeline into a visual interface designed around scholars’ daily workflows, bringing discovery and confirmation into a single environment.</p>
      <p>Even a highly accurate model can produce a ranked list spanning thousands of candidates. Making those results efficient to review is essential. Grounded in HCI research and the formative study, the interface lets scholars explore suggestions, compare fragments and record their judgements through familiar visual controls, without needing machine learning expertise.</p>
      <p><a class="genidaat-prototype-link" href="https://sv533-beta.iis-lab.space/">Explore the Genida’at prototype <span aria-hidden="true">↗</span></a></p>

      <div class="genidaat-feature">
        <figure class="research-figure genidaat-feature__image">
          <a href="{{ '/assets/images/research/genidaat-ranking-grid.png' | relative_url }}" aria-label="Open the candidate-grid screenshot at full size"><img src="{{ '/assets/images/research/genidaat-ranking-grid.png' | relative_url }}" alt="Genida’at’s ranked candidate grid, with the anchor fragment in the centre and eight suggested joins arranged around it. Each candidate can be marked as a join, not a join or possible join." width="1498" height="973" loading="lazy"></a>
        </figure>
        <div class="genidaat-feature__text">
          <h3>Review at a glance</h3>
          <p>A ranked grid keeps the anchor in view while scholars scan potential joins and record an initial judgement. Promising candidates can then be opened for closer inspection.</p>
          <p class="genidaat-image-hint">Select the image to view it at full size.</p>
        </div>
      </div>

      <div class="genidaat-comparison">
        <h3>Compare the details</h3>
        <p>Side-by-side comparison supports independent zooming, background removal and scale calibration, so fragments can be inspected at their correct relative physical sizes. Scholars retain the final decision: <em>join</em>, <em>possible join</em> or <em>not a join</em>.</p>
        <figure class="research-figure">
          <a href="{{ '/assets/images/research/genidaat-comparison.png' | relative_url }}" aria-label="Open the side-by-side comparison screenshot at full size"><img src="{{ '/assets/images/research/genidaat-comparison.png' | relative_url }}" alt="Two manuscript fragments compared side by side in Genida’at, with photographic backgrounds removed and both images calibrated to the same physical scale." width="1630" height="1074" loading="lazy"></a>
        </figure>
      </div>

      <div class="genidaat-evaluation">
        <h3>Evaluation with scholars</h3>
        <p>In a follow-up study with <strong>9 additional scholars</strong>, Genida’at achieved a mean <strong>System Usability Scale (SUS) score of 77.2 out of 100</strong>.</p>
        <figure class="research-figure genidaat-sus">
          <img src="{{ '/assets/images/research/genidaat-sus.svg' | relative_url }}" alt="Individual SUS scores: P1 85, P2 65, P5 87.5, P6 50, P7 82.5, P8 92.5, P9 80, P10 90 and P11 62.5. The mean is 77.2 out of 100." width="234.48" height="192.144" loading="lazy">
        </figure>
        <div class="participant-feedback" aria-label="Feedback from the follow-up study">
          <blockquote><p>“<strong>astonishingly quick</strong>, and the search […] far more straightforward to use.”</p><footer>— P1</footer></blockquote>
          <blockquote><p>“this tool can <strong>save a lot of time.</strong>”</p><footer>— P5</footer></blockquote>
          <blockquote><p>“could cut my processing <strong>time by at least 50%</strong>”</p><footer>— P8</footer></blockquote>
        </div>
        <p class="genidaat-study-note">These comments reflect participants’ impressions and anticipated time savings. P6’s main criticism was that the prototype did not yet include the full collection.</p>
      </div>
      <p>This work illustrates how user-centred design can make AI-assisted technology accessible in a highly specialised domain, giving non-technical experts tools that fit their workflows without requiring technical training.</p>
      <p>The project was selected for the <a href="https://www.ai.cam.ac.uk/news/from-safer-workplaces-to-medieval-manuscripts-five-new-ai-deas-projects-put-ai-to-work-on-real-world-problems/">ai@cam AI-deas Sprint</a> to develop it into a production-ready system for practical use.</p>
    </section>
  </div>
</div>
<script src="{{ '/assets/js/research.js' | relative_url }}" defer></script>
<script src="{{ '/assets/js/join-explorer.js' | relative_url }}" defer></script>

<script src="{{ '/assets/js/research-reveals.js' | relative_url }}" defer></script>
