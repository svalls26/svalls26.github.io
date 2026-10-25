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
      <p class="research-contents__label">In this thesis</p>
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
      <a class="research-thesis-link" href="https://drive.google.com/file/d/1f63JcBByUEnj4Q4bZbJxVZQWwxJD1nya/view?usp=sharing">Read the full thesis <span aria-hidden="true">↗</span></a>
    </header>

    <section id="genizah-jigsaw" class="research-section" aria-labelledby="genizah-jigsaw-heading">
      <h2 id="genizah-jigsaw-heading">The Genizah Jigsaw</h2>
      <figure class="research-figure">
        <img src="{{ '/assets/images/research/solomon-schechter.jpg' | relative_url }}" alt="Solomon Schechter seated at a table in Cambridge, surrounded by piles of manuscript fragments in 1898." width="1200" height="1059">
        <figcaption>Solomon Schechter at work in Cambridge, 1898. Cambridge University Library, via <a href="https://artsandculture.google.com/asset/solomon-schechter-at-work-in-cambridge-cambridge-university-library/1gFAH8WCN2YE-A">Google Arts &amp; Culture</a>.</figcaption>
      </figure>
      <p>Medieval manuscript collections have become fragmented and dispersed across institutions worldwide through damage and the sale and resale of fragments. The <a href="https://www.cam.ac.uk/stories/discarded-history-treasures-of-the-cairo-genizah">Cairo Genizah</a> is no exception: estimated to contain around 400,000 fragments, it is one of the most important collections for the study of medieval Jewish history. Generations of scholars have been trying to solve this jigsaw by making joins, that is, identifying two or more fragments that belonged to the same original work. As Schechter himself put it, this work “is not for one man, and not for one generation”.</p>
    </section>

    <section id="methodology" class="research-section" aria-labelledby="methodology-heading">
      <h2 id="methodology-heading">Methodology</h2>
      <p>I followed a participatory design approach, grounding the technical work in the practices and needs of Hebrew manuscript scholars. The research moved through three connected phases.</p>
      {% include methodology-diagram.html %}
    </section>

    <section id="join-problem" class="research-section" aria-labelledby="join-problem-heading">
      <h2 id="join-problem-heading">The Join Problem</h2>
      <p>A join connects fragments that belonged to the same original manuscript. They need not share a torn edge: they may be separate leaves of the same book. Scholars weigh evidence such as letter forms, page layout, material and textual features to decide whether the connection is plausible.</p>
      <p>The formative study distinguished two stages: <strong>discovery</strong>, finding promising candidates in a vast collection, and <strong>confirmation</strong>, examining those candidates closely. The main bottleneck was discovery. This shaped the role of AI in the system: surface a manageable set of possibilities for experts to assess.</p>
    </section>

    <section id="retrieving-candidate-joins" class="research-section" aria-labelledby="retrieving-candidate-joins-heading">
      <h2 id="retrieving-candidate-joins-heading">Retrieving Candidate Joins</h2>
      <p>The retrieval pipeline focuses on the manuscript’s writing rather than the photographic background. It extracts handwritten units, encodes their visual features with a frozen DINO backbone, and aggregates them into a descriptor for each fragment. Comparing these descriptors produces a ranked list of potential joins.</p>
      <p>The aim is to bring relevant fragments within a practical review depth, including matches held by different institutions. The ranking provides candidates for scholarly inspection; visual similarity alone does not establish a join.</p>
    </section>

    <section id="genidaat" class="research-section" aria-labelledby="genidaat-heading">
      <h2 id="genidaat-heading">Genida’at: An Interface for Join Discovery</h2>
      <p>Genida’at brings discovery and confirmation into one workspace. Scholars can browse the collection or begin with a known fragment, review ranked candidates, and compare promising pairs side by side. Independent zooming, scale calibration and background removal support close visual inspection.</p>
      <p>Each pair can be labelled as a <em>join</em>, a <em>possible join</em> or <em>not a join</em>, preserving uncertainty and leaving the final judgement with the scholar. Confirmed and possible joins are saved for later review.</p>
      <p>The project was selected for the <a href="https://www.ai.cam.ac.uk/news/from-safer-workplaces-to-medieval-manuscripts-five-new-ai-deas-projects-put-ai-to-work-on-real-world-problems/">ai@cam AI-deas Sprint</a> to develop it into a production-ready system for practical use.</p>
    </section>
  </div>
</div>
<script src="{{ '/assets/js/research.js' | relative_url }}" defer></script>
