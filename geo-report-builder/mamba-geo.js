/* Mamba — Competitive GEO Report Builder v1.0.1 */
(function(){
"use strict";

/* =====================================================================
   MambaGEO — report builder
   ---------------------------------------------------------------------
   PORTING TO WEBFLOW
   Replace the three functions in MambaGEO.adapters with real endpoints.
   Nothing else in this file needs to change.
   ===================================================================== */

var MambaGEO = {};

/* The component root. Every DOM lookup is scoped to this, so the app never
   touches anything else on the Webflow page. */
var ROOT = null;

/* ---------- markup the component renders into its mount point ---------- */
var STAGE_HTML = "<div class=\"mg-flow\"><div class=\"mg-rail\" aria-hidden=\"true\"><div class=\"mg-rail__seg\" data-seg=\"0\" data-on=\"1\"></div><div class=\"mg-rail__seg\" data-seg=\"1\"></div><div class=\"mg-rail__seg\" data-seg=\"2\"></div><div class=\"mg-rail__seg\" data-seg=\"3\"></div></div><form id=\"mg-form\" novalidate><fieldset class=\"mg-step\" data-step=\"0\" data-active=\"1\" style=\"border:0;padding:0;margin:0;min-width:0;\"><p class=\"mg-step__count\">Step 1 of 4</p><h2 class=\"mg-step__q\">Which brand are we benchmarking?</h2><p class=\"mg-step__help\">We read your site to understand what you sell and who buys it. That shapes every prompt we track.</p><div class=\"mg-field\"><label class=\"mg-field__label\" for=\"mg-domain\">Your website</label><div class=\"mg-prefix\"><span>https://</span><input class=\"mg-input\" id=\"mg-domain\" type=\"text\" inputmode=\"url\" autocomplete=\"url\" placeholder=\"yourbrand.com\"></div><p class=\"mg-err\" id=\"mg-err-domain\">Enter a domain so we know which brand to track.</p></div><div class=\"mg-field\"><span class=\"mg-field__label\" id=\"mg-market-label\">Primary market <span class=\"mg-field__sub\">\u2014 AI answers differ by country</span></span><div class=\"mg-chips\" role=\"group\" aria-labelledby=\"mg-market-label\" id=\"mg-markets\"></div></div><div class=\"mg-field\"><label class=\"mg-field__label\" for=\"mg-vertical\">What you sell</label><select class=\"mg-input mg-input--ghost\" id=\"mg-vertical\"><option value=\"saas\">B2B software</option><option value=\"realestate\">Luxury real estate</option><option value=\"legal\">Legal services</option><option value=\"insurance\">Insurance</option><option value=\"ecom\">E-commerce</option><option value=\"pro\">Other professional services</option></select></div><div class=\"mg-actions\"><button class=\"mg-btn\" type=\"button\" data-go=\"1\">Next: competitors <span class=\"mg-btn__arrow\" aria-hidden=\"true\">\u2197</span></button></div></fieldset><fieldset class=\"mg-step\" data-step=\"1\" style=\"border:0;padding:0;margin:0;min-width:0;\"><p class=\"mg-step__count\">Step 2 of 4</p><h2 class=\"mg-step__q\">Who are you up against?</h2><p class=\"mg-step__help\">The brands AI names in your category are often not the ones you track in Google. Add up to five, or let us find them.</p><div class=\"mg-modes\" role=\"group\" aria-label=\"How to add competitors\"><button type=\"button\" class=\"mg-mode\" data-mode=\"type\" aria-pressed=\"true\"><b>I'll name them</b><small>Type the brands you already compete with.</small></button><button type=\"button\" class=\"mg-mode\" data-mode=\"find\" aria-pressed=\"false\"><b>Find them for me</b><small>We identify who AI puts in front of your buyers.</small></button></div><div class=\"mg-pane\" data-pane=\"type\" data-active=\"1\"><div class=\"mg-tagbox\" id=\"mg-tagbox\"><input type=\"text\" id=\"mg-comp-input\" placeholder=\"Type a brand or domain, press Enter\" aria-label=\"Add a competitor\"></div><p class=\"mg-note\">Separate with Enter or a comma. Paste a list and we will split it.</p></div><div class=\"mg-pane\" data-pane=\"find\"><div class=\"mg-scan\" id=\"mg-scan\"><div class=\"mg-scan__head\"><b id=\"mg-scan-title\">Ready when you are</b><em id=\"mg-scan-count\"></em></div><ul class=\"mg-scan__steps\" id=\"mg-scan-steps\" aria-live=\"polite\"></ul><div id=\"mg-found\"></div><div class=\"mg-actions\" style=\"margin-top:16px;\"><button type=\"button\" class=\"mg-btn mg-btn--sm\" id=\"mg-scan-go\">Identify my competitors <span class=\"mg-btn__arrow\" aria-hidden=\"true\">\u2197</span></button></div></div><p class=\"mg-note\" id=\"mg-scan-note\"><b>Prototype note.</b> This preview returns sample brands. In production it reads your site, pulls organic overlap from Ahrefs, and scans live AI answers for the brands named alongside you.</p></div><p class=\"mg-err\" id=\"mg-err-comp\">Add at least one competitor, or let us identify them.</p><div class=\"mg-actions\"><button class=\"mg-btn\" type=\"button\" data-go=\"2\">Next: buyer prompts <span class=\"mg-btn__arrow\" aria-hidden=\"true\">\u2197</span></button><button class=\"mg-btn mg-btn--text\" type=\"button\" data-back=\"0\">Back</button></div></fieldset><fieldset class=\"mg-step\" data-step=\"2\" style=\"border:0;padding:0;margin:0;min-width:0;\"><p class=\"mg-step__count\">Step 3 of 4</p><h2 class=\"mg-step__q\">What do your buyers ask AI?</h2><p class=\"mg-step__help\">These are the questions we run every day across all six engines. Edit anything that does not sound like your buyer.</p><div class=\"mg-prompts\" id=\"mg-prompt-list\"></div><div class=\"mg-actions\" style=\"margin-top:0;\"><button type=\"button\" class=\"mg-btn mg-btn--quiet mg-btn--sm\" id=\"mg-prompt-add\">Add your own prompt</button><button type=\"button\" class=\"mg-btn mg-btn--quiet mg-btn--sm\" id=\"mg-prompt-more\">Suggest more</button></div><p class=\"mg-err\" id=\"mg-err-prompt\">Keep at least one prompt so there is something to measure.</p><div class=\"mg-actions\"><button class=\"mg-btn\" type=\"button\" data-go=\"3\">Next: send it to me <span class=\"mg-btn__arrow\" aria-hidden=\"true\">\u2197</span></button><button class=\"mg-btn mg-btn--text\" type=\"button\" data-back=\"1\">Back</button></div></fieldset><fieldset class=\"mg-step\" data-step=\"3\" style=\"border:0;padding:0;margin:0;min-width:0;\"><p class=\"mg-step__count\">Step 4 of 4</p><h2 class=\"mg-step__q\">Where should we send it?</h2><p class=\"mg-step__help\">You get the full benchmark plus an analyst's read on the three gaps worth closing first. No call required to receive it.</p><div class=\"mg-field\"><label class=\"mg-field__label\" for=\"mg-name\">Your name</label><input class=\"mg-input\" id=\"mg-name\" type=\"text\" autocomplete=\"name\" placeholder=\"First and last name\"></div><div class=\"mg-field\"><label class=\"mg-field__label\" for=\"mg-email\">Work email</label><input class=\"mg-input\" id=\"mg-email\" type=\"email\" autocomplete=\"email\" placeholder=\"you@yourbrand.com\"><p class=\"mg-err\" id=\"mg-err-email\">Use a work email so we can match it to your domain.</p></div><div class=\"mg-actions\"><button class=\"mg-btn mg-btn--wide\" type=\"submit\" id=\"mg-submit\">Build my competitive GEO report <span class=\"mg-btn__arrow\" aria-hidden=\"true\">\u2197</span></button><button class=\"mg-btn mg-btn--text\" type=\"button\" data-back=\"2\">Back</button></div></fieldset></form><div class=\"mg-done\" id=\"mg-done\"><div class=\"mg-done__tick\" aria-hidden=\"true\">\u2713</div><h2 id=\"mg-done-title\">Your report is queued.</h2><p id=\"mg-done-body\">We are collecting answers now. An analyst reviews every report before it leaves, because the data is the easy part.</p><ul class=\"mg-next\"><li><b>Within 1 hour</b><span>Prompt set confirmed and tracking starts across all six engines.</span></li><li><b>Day 3</b><span>Enough answers collected to rank you against your competitor set reliably.</span></li><li><b>Day 4</b><span>Report lands in your inbox with the three gaps an analyst thinks you should close first.</span></li></ul><div class=\"mg-actions\" style=\"margin-top:0;\"><button class=\"mg-btn mg-btn--quiet mg-btn--sm\" type=\"button\" id=\"mg-restart\">Benchmark another brand</button></div><details class=\"mg-dev\"><summary>View the payload this sends (build reference)</summary><pre id=\"mg-payload\"></pre></details></div></div><aside class=\"mg-panel\" aria-label=\"Your report as it is being built\"><div class=\"mg-panel__top\"><div class=\"mg-panel__kicker\"><span class=\"mg-live\" aria-hidden=\"true\"></span> Your report, so far</div><h2 class=\"mg-panel__title\" id=\"mg-p-brand\">Untitled brand</h2><p class=\"mg-panel__sub\" id=\"mg-p-market\">Pick a market to begin</p></div><div class=\"mg-meter\"><div class=\"mg-meter__row\"><b id=\"mg-p-points\">0</b><span>AI answers collected<br>over the first 30 days</span></div><div class=\"mg-meter__bar\"><i id=\"mg-p-bar\"></i></div></div><div class=\"mg-block\"><div class=\"mg-block__h\"><b>Engines tracked</b><em>6 of 6</em></div><div class=\"mg-engines\" id=\"mg-p-engines\"></div></div><div class=\"mg-block\"><div class=\"mg-block__h\"><b>Brands compared</b><em id=\"mg-p-compcount\">1</em></div><ul class=\"mg-list\" id=\"mg-p-comps\"></ul></div><div class=\"mg-block\"><div class=\"mg-block__h\"><b>Prompts tracked</b><em id=\"mg-p-promptcount\">0</em></div><ul class=\"mg-list\" id=\"mg-p-prompts\"></ul></div><div class=\"mg-block\"><div class=\"mg-block__h\"><b>Sections you receive</b><em>9</em></div><div class=\"mg-sections\"><div>Performance summary</div><div>Query fan-outs</div><div>Retrievals &amp; citations</div><div>Most cited domains</div><div>Visibility vs competitors</div><div>Prompt visibility</div><div>Branded prompts</div><div>Buyer actions</div><div>Prioritised actions</div><div style=\"color:var(--mg-lime);\">+ analyst read</div></div></div><div class=\"mg-panel__foot\"><p>Masked values fill in once collection runs. We do not estimate numbers we have not measured.</p></div></aside>";

/* ---------- configuration ---------- */
var ENGINES = [
  {id:"chatgpt",  name:"ChatGPT",              color:"var(--mg-chatgpt)"},
  {id:"aio",      name:"Google AI Overviews",  color:"var(--mg-aio)"},
  {id:"aimode",   name:"Google AI Mode",       color:"var(--mg-aimode)"},
  {id:"pplx",     name:"Perplexity",           color:"var(--mg-pplx)"},
  {id:"gemini",   name:"Gemini",               color:"var(--mg-gemini)"},
  {id:"claude",   name:"Claude",               color:"var(--mg-claude)"}
];

var MARKETS = ["Singapore","UAE","Australia","United States","United Kingdom","Global"];

var MAX_COMPETITORS = 5;
var MAX_PROMPTS = 10;
var TRACKING_DAYS = 30;

/* Prompt libraries by vertical. {market} and {brand} are substituted. */
var PROMPT_LIB = {
  saas:[
    "Best {category} for mid-market teams in {market}",
    "What are the top alternatives to the leading {category} platform?",
    "Is {brand} worth the money?",
    "Which {category} tool has the best onboarding?",
    "Cheapest enterprise-grade {category}",
    "{category} platforms that integrate with Salesforce",
    "What do reviewers say about {brand}?",
    "Which {category} vendor is best for a 200-person company?"
  ],
  realestate:[
    "Best luxury real estate agency in {market}",
    "Who handles high-end property sales in {market}?",
    "How do I sell a luxury home privately in {market}?",
    "Is {brand} a reputable property agency?",
    "Which agency gets the highest sale prices in {market}?",
    "Best agent for off-market property in {market}",
    "What commission do luxury agents charge in {market}?"
  ],
  legal:[
    "Best law firm for commercial disputes in {market}",
    "Who should I hire for a cross-border contract review?",
    "Is {brand} a good law firm?",
    "How much does a corporate lawyer cost in {market}?",
    "Top-rated employment lawyers in {market}",
    "Which firm handles regulatory investigations in {market}?"
  ],
  insurance:[
    "Best business insurance provider in {market}",
    "Who offers the cheapest professional indemnity cover in {market}?",
    "Is {brand} a reliable insurer?",
    "What does cyber liability insurance cover?",
    "Compare commercial insurance brokers in {market}",
    "Best insurance for a small business in {market}"
  ],
  ecom:[
    "Best place to buy {category} online in {market}",
    "Is {brand} legit?",
    "{category} brands with the best returns policy",
    "What is the best-value {category} under budget?",
    "Compare the top {category} retailers",
    "Which {category} brand lasts longest?"
  ],
  pro:[
    "Best {category} consultancy in {market}",
    "Who should I hire for {category} work in {market}?",
    "Is {brand} any good?",
    "How much does {category} consulting cost in {market}?",
    "Top-rated {category} firms in {market}",
    "Which {category} agency works with enterprise clients?"
  ]
};

var CATEGORY_WORD = {
  saas:"software", realestate:"property", legal:"legal", insurance:"insurance",
  ecom:"the category", pro:"consulting"
};

/* Sample competitor sets. Fictional names on purpose: a prototype should never
   put a real company in front of a prospect as a "detected" competitor. */
var SAMPLE_COMPETITORS = {
  saas:[
    {name:"Northgate Systems", reason:"Named in 4 of your 6 category prompts", score:"71%"},
    {name:"Loop & Ledger",     reason:"Cited by the same review sites you rely on", score:"64%"},
    {name:"Parallax Suite",    reason:"Owns the comparison pages AI retrieves most", score:"58%"},
    {name:"Mondo Stack",       reason:"Strong in Perplexity, absent in AI Overviews", score:"41%"},
    {name:"Vero Operations",   reason:"Rising share of voice over the last 60 days", score:"33%"},
    {name:"Clearhaul",         reason:"Overlaps on 180 of your organic keywords", score:"27%"}
  ],
  realestate:[
    {name:"Harbour & Vale",       reason:"Named in 5 of your 6 category prompts", score:"76%"},
    {name:"Kestrel Residential",  reason:"Owns the 'best agency in market' answer", score:"62%"},
    {name:"Oakline Estates",      reason:"Cited through portal listings, not its own site", score:"55%"},
    {name:"Marchmont Partners",   reason:"Strong in Gemini, invisible in ChatGPT", score:"38%"},
    {name:"Vantage Collective",   reason:"New entrant gaining share of voice", score:"29%"},
    {name:"Ridgeway Prime",       reason:"Overlaps on your highest-value keywords", score:"24%"}
  ],
  legal:[
    {name:"Ashworth Lane",      reason:"Named in 5 of your 6 category prompts", score:"73%"},
    {name:"Carter Reed LLP",    reason:"Cited via legal directories AI trusts", score:"66%"},
    {name:"Halden & Burke",     reason:"Owns the 'how much does it cost' answers", score:"52%"},
    {name:"Stonebridge Legal",  reason:"Strong in AI Overviews, weak elsewhere", score:"44%"},
    {name:"Merrow Chambers",    reason:"Rising on employment-law prompts", score:"31%"},
    {name:"Fairhurst Advisory", reason:"Overlaps on 210 of your organic keywords", score:"22%"}
  ],
  insurance:[
    {name:"Ardent Cover",       reason:"Named in 4 of your 6 category prompts", score:"69%"},
    {name:"Brightmark Risk",    reason:"Cited by the comparison sites AI retrieves", score:"61%"},
    {name:"Sentry & Co",        reason:"Owns the 'cheapest cover' answer", score:"50%"},
    {name:"Palmer Underwriting",reason:"Strong in Claude, absent in Perplexity", score:"36%"},
    {name:"Keel Assurance",     reason:"Rising share of voice on cyber prompts", score:"28%"},
    {name:"Trellis Mutual",     reason:"Overlaps on your top commercial keywords", score:"21%"}
  ],
  ecom:[
    {name:"Fold & Field",     reason:"Named in 5 of your 6 category prompts", score:"74%"},
    {name:"Harlow Goods",     reason:"Cited through Reddit and review roundups", score:"63%"},
    {name:"Quarterlight",     reason:"Owns the 'best value' answer in your category", score:"49%"},
    {name:"Bramble Supply",   reason:"Strong in ChatGPT shopping answers", score:"40%"},
    {name:"Nine Mile Co",     reason:"Rising fast on 'is it legit' prompts", score:"30%"},
    {name:"Oscar & Pike",     reason:"Overlaps on your highest-converting terms", score:"19%"}
  ],
  pro:[
    {name:"Calder Advisory",    reason:"Named in 4 of your 6 category prompts", score:"70%"},
    {name:"Thorne Group",       reason:"Cited by the industry press AI retrieves", score:"59%"},
    {name:"Ridley & Shaw",      reason:"Owns the 'who should I hire' answer", score:"51%"},
    {name:"Lumen Partners",     reason:"Strong in Gemini, weak in AI Overviews", score:"39%"},
    {name:"Brackenhouse",       reason:"Rising share of voice this quarter", score:"26%"},
    {name:"Ivy Court Consulting",reason:"Overlaps on 140 of your organic keywords", score:"18%"}
  ]
};

/* =====================================================================
   ADAPTERS — swap these three for real endpoints in production
   ===================================================================== */
MambaGEO.adapters = {

  /* PRODUCTION: POST /api/geo/identify-competitors
     Server side: read the site, pull Ahrefs organic competitors,
     run the prompt set through Peec AI, return brands named alongside
     the client ranked by co-occurrence. */
  identifyCompetitors:function(payload){
    return new Promise(function(resolve){
      var set = SAMPLE_COMPETITORS[payload.vertical] || SAMPLE_COMPETITORS.pro;
      setTimeout(function(){ resolve(set.slice(0,6)); }, 120);
    });
  },

  /* PRODUCTION: POST /api/geo/suggest-prompts
     Server side: derive the buyer-question set from the site and category. */
  suggestPrompts:function(payload){
    var lib = (PROMPT_LIB[payload.vertical] || PROMPT_LIB.pro).slice();
    var cat = CATEGORY_WORD[payload.vertical] || "the category";
    var out = lib.map(function(t){
      return t.replace(/\{market\}/g, payload.market || "your market")
              .replace(/\{brand\}/g, payload.brand || "your brand")
              .replace(/\{category\}/g, cat);
    });
    return Promise.resolve(out);
  },

  /* Submits to BOTH destinations, independently.
       1. HubSpot Forms API v3 - public, CORS-enabled, built for custom forms.
          Needs data-hs-portal and data-hs-form on the mount element.
       2. A hidden native Webflow form, if present, for a second record and
          the usual email notification.
     Neither blocks the other, and neither blocks the confirmation screen. */
  submitLead:function(payload){
    var jobs = [];

    var portal = ROOT && ROOT.getAttribute("data-hs-portal");
    var guid   = ROOT && ROOT.getAttribute("data-hs-form");
    if(portal && guid){
      var parts = String(payload.contact.name || "").trim().split(/\s+/);
      var fields = [
        {name:"email",     value:payload.contact.email},
        {name:"firstname", value:parts[0] || ""},
        {name:"lastname",  value:parts.slice(1).join(" ")},
        {name:"website",   value:payload.domain},
        {name:"company",   value:payload.brand},
        {name:"geo_market",            value:payload.market},
        {name:"geo_vertical",          value:payload.vertical},
        {name:"geo_competitors",       value:payload.competitors.join(", ")},
        {name:"geo_prompts",           value:payload.prompts.join(" | ")},
        {name:"geo_competitor_source", value:payload.competitorSource},
        {name:"geo_payload",           value:JSON.stringify(payload)}
      ].filter(function(f){ return f.value !== "" && f.value != null; });

      var body = {
        fields: fields,
        context: { pageUri: window.location.href, pageName: document.title }
      };
      var hutk = document.cookie.replace(/(?:(?:^|.*;\s*)hubspotutk\s*=\s*([^;]*).*$)|^.*$/, "$1");
      if(hutk){ body.context.hutk = hutk; }

      /* EU portals submit to api-eu1.hsforms.com, not api.hsforms.com.
         Read the region from data-hs-region; na1 (or absent) means the US host. */
      var region = (ROOT && ROOT.getAttribute("data-hs-region")) || "na1";
      var hsHost = (region && region !== "na1") ? "api-" + region + ".hsforms.com"
                                                : "api.hsforms.com";

      jobs.push(
        fetch("https://" + hsHost + "/submissions/v3/integration/submit/" + portal + "/" + guid, {
          method:"POST",
          headers:{"Content-Type":"application/json"},
          body:JSON.stringify(body)
        }).then(function(r){
          if(!r.ok && window.console){ console.warn("[MambaGEO] HubSpot returned " + r.status); }
        }).catch(function(e){
          if(window.console){ console.warn("[MambaGEO] HubSpot submission failed", e); }
        })
      );
    } else if(window.console){
      console.warn("[MambaGEO] no data-hs-portal / data-hs-form; skipping HubSpot");
    }

    var formId = (ROOT && ROOT.getAttribute("data-form-id")) || "mg-geo-form";
    var wrap = document.getElementById(formId);
    var form = wrap ? (wrap.tagName === "FORM" ? wrap : wrap.querySelector("form")) : null;
    if(form){
      var fill = function(name, value){
        var f = form.querySelector('[name="' + name + '"]');
        if(f){ f.value = value; }
      };
      fill("geo-name", payload.contact.name);
      fill("geo-email", payload.contact.email);
      fill("geo-brand", payload.brand);
      fill("geo-domain", payload.domain);
      fill("geo-market", payload.market);
      fill("geo-competitors", payload.competitors.join(", "));
      fill("geo-prompts", payload.prompts.join(" | "));
      fill("geo-payload", JSON.stringify(payload));
      var btn = form.querySelector('input[type="submit"], button[type="submit"]');
      if(btn){ btn.click(); }
      else { form.dispatchEvent(new Event("submit", {bubbles:true, cancelable:true})); }
    } else if(window.console){
      console.warn("[MambaGEO] no Webflow form #" + formId + " found; payload:", payload);
    }

    if(!jobs.length){ return Promise.resolve({ok:true}); }
    return Promise.race([
      Promise.all(jobs),
      new Promise(function(res){ setTimeout(res, 4000); })
    ]).then(function(){ return {ok:true}; });
  }
};

/* =====================================================================
   STATE
   ===================================================================== */
var state = {
  step:0,
  domain:"",
  brand:"",
  market:"Singapore",
  vertical:"saas",
  mode:"type",
  competitors:[],
  prompts:[],
  promptPool:[],
  name:"",
  email:""
};

/* ---------- tiny helpers ---------- */
function $(s,c){return (c||ROOT).querySelector(s);}
function $$(s,c){return Array.prototype.slice.call((c||ROOT).querySelectorAll(s));}
function el(tag,cls,txt){var n=document.createElement(tag);if(cls)n.className=cls;if(txt!=null)n.textContent=txt;return n;}
function cleanDomain(v){
  return String(v||"").trim().toLowerCase()
    .replace(/^https?:\/\//,"").replace(/^www\./,"").replace(/\/.*$/,"").replace(/\s+/g,"");
}
function brandFromDomain(d){
  var core = cleanDomain(d).split(".")[0] || "";
  if(!core) return "";
  return core.replace(/[-_]+/g," ").replace(/\b\w/g,function(m){return m.toUpperCase();});
}
function validEmail(v){return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(String(v||"").trim());}
function err(id,on){var n=$("#"+id); if(n) n.setAttribute("data-on", on?"1":"0");}

/* =====================================================================
   RENDER: right-hand panel
   ===================================================================== */
function renderPanel(){
  $("#mg-p-brand").textContent = state.brand || cleanDomain(state.domain) || "Untitled brand";
  $("#mg-p-market").textContent = state.market
    ? state.market + " · tracked daily for " + TRACKING_DAYS + " days"
    : "Pick a market to begin";

  var prompts = state.prompts.filter(function(p){return p.on && p.text.trim();});
  var answers = prompts.length * ENGINES.length * TRACKING_DAYS;
  $("#mg-p-points").textContent = answers.toLocaleString();
  var pct = Math.min(100, (prompts.length / MAX_PROMPTS) * 100);
  $("#mg-p-bar").style.width = pct + "%";

  /* engines */
  var eHost = $("#mg-p-engines");
  if(!eHost.childNodes.length){
    ENGINES.forEach(function(e){
      var row = el("div","mg-engine");
      var dot = el("i"); dot.style.background = e.color;
      var nm = el("span",null,e.name);
      var mask = el("span","mg-mask");
      mask.setAttribute("title","Value fills in once collection runs");
      row.appendChild(dot); row.appendChild(nm); row.appendChild(mask);
      eHost.appendChild(row);
    });
  }

  /* competitors */
  var cHost = $("#mg-p-comps"); cHost.innerHTML = "";
  var you = el("li",null,(state.brand || "Your brand") + " — you");
  cHost.appendChild(you);
  if(!state.competitors.length){
    var e0 = el("li",null,"No competitors added yet");
    e0.setAttribute("data-empty","1"); cHost.appendChild(e0);
  } else {
    state.competitors.forEach(function(c){ cHost.appendChild(el("li",null,c)); });
  }
  $("#mg-p-compcount").textContent = (state.competitors.length + 1);

  /* prompts */
  var pHost = $("#mg-p-prompts"); pHost.innerHTML = "";
  if(!prompts.length){
    var e1 = el("li",null,"No prompts selected yet");
    e1.setAttribute("data-empty","1"); pHost.appendChild(e1);
  } else {
    prompts.slice(0,5).forEach(function(p){ pHost.appendChild(el("li",null,p.text)); });
    if(prompts.length > 5) pHost.appendChild(el("li",null,"+ " + (prompts.length-5) + " more"));
  }
  $("#mg-p-promptcount").textContent = prompts.length;
}

/* =====================================================================
   RENDER: steps
   ===================================================================== */
function goStep(n){
  state.step = n;
  $$(".mg-step").forEach(function(s){
    s.setAttribute("data-active", Number(s.getAttribute("data-step"))===n ? "1":"0");
  });
  $$(".mg-rail__seg").forEach(function(s){
    s.setAttribute("data-on", Number(s.getAttribute("data-seg"))<=n ? "1":"0");
  });
  var active = $('.mg-step[data-active="1"]');
  if(active){
    var h = active.querySelector(".mg-step__q");
    if(h){ h.setAttribute("tabindex","-1"); h.focus({preventScroll:true}); }
  }
}

/* markets */
function renderMarkets(){
  var host = $("#mg-markets");
  MARKETS.forEach(function(m){
    var b = el("button","mg-chip",m);
    b.type = "button";
    b.setAttribute("aria-pressed", m===state.market ? "true":"false");
    b.addEventListener("click", function(){
      state.market = m;
      $$(".mg-chip", host).forEach(function(x){ x.setAttribute("aria-pressed", x===b ? "true":"false"); });
      refreshPromptsForContext();
      renderPanel();
    });
    host.appendChild(b);
  });
}

/* =====================================================================
   COMPETITOR TAGS
   ===================================================================== */
function addCompetitor(raw){
  var v = String(raw||"").trim().replace(/,+$/,"");
  if(!v) return false;
  if(state.competitors.length >= MAX_COMPETITORS) return false;
  var exists = state.competitors.some(function(c){return c.toLowerCase()===v.toLowerCase();});
  if(exists) return false;
  state.competitors.push(v);
  renderTags(); renderPanel();
  return true;
}
function removeCompetitor(v){
  state.competitors = state.competitors.filter(function(c){return c!==v;});
  renderTags(); renderPanel(); syncFoundChecks();
}
function renderTags(){
  var box = $("#mg-tagbox");
  var input = $("#mg-comp-input");
  $$(".mg-tag", box).forEach(function(t){t.remove();});
  state.competitors.forEach(function(c){
    var tag = el("span","mg-tag");
    tag.appendChild(el("span",null,c));
    var x = el("button",null,"×");
    x.type="button";
    x.setAttribute("aria-label","Remove " + c);
    x.addEventListener("click", function(){ removeCompetitor(c); });
    tag.appendChild(x);
    box.insertBefore(tag, input);
  });
  input.placeholder = state.competitors.length >= MAX_COMPETITORS
    ? "Five is the limit — remove one to swap"
    : "Type a brand or domain, press Enter";
  input.disabled = state.competitors.length >= MAX_COMPETITORS;
}
function syncFoundChecks(){
  $$("#mg-found input[type=checkbox]").forEach(function(cb){
    cb.checked = state.competitors.indexOf(cb.value) > -1;
  });
}

/* =====================================================================
   IDENTIFY SEQUENCE
   ===================================================================== */
var SCAN_STEPS = [
  "Reading your site and working out what you sell",
  "Pulling organic keyword overlap from Ahrefs",
  "Running your category prompts across six engines",
  "Counting which brands get named alongside you",
  "Ranking by how often they take the answer"
];
var scanRunning = false;

function runScan(){
  if(scanRunning) return;
  if(!cleanDomain(state.domain)){
    err("mg-err-comp", true);
    $("#mg-err-comp").textContent = "Add your domain in step 1 first — we identify competitors from your site.";
    return;
  }
  err("mg-err-comp", false);
  scanRunning = true;

  var btn = $("#mg-scan-go");
  btn.disabled = true;
  btn.firstChild.nodeValue = "Working ";
  $("#mg-found").innerHTML = "";
  $("#mg-scan-title").textContent = "Analysing " + cleanDomain(state.domain);
  $("#mg-scan-count").textContent = "";

  var host = $("#mg-scan-steps");
  host.innerHTML = "";
  var nodes = SCAN_STEPS.map(function(txt){
    var li = el("li");
    li.setAttribute("data-state","wait");
    li.appendChild(el("span","mg-dot"));
    li.appendChild(el("span",null,txt));
    host.appendChild(li);
    return li;
  });

  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var beat = reduce ? 90 : 520;

  nodes.forEach(function(li,i){
    setTimeout(function(){
      if(i>0) nodes[i-1].setAttribute("data-state","done");
      li.setAttribute("data-state","run");
    }, beat*i);
  });

  setTimeout(function(){
    nodes[nodes.length-1].setAttribute("data-state","done");
    MambaGEO.adapters.identifyCompetitors({
      domain:cleanDomain(state.domain), market:state.market, vertical:state.vertical
    }).then(function(list){
      renderFound(list);
      scanRunning = false;
      btn.disabled = false;
      btn.firstChild.nodeValue = "Run it again ";
    });
  }, beat*nodes.length + (reduce?60:260));
}

function renderFound(list){
  $("#mg-scan-title").textContent = "Brands AI names alongside you";
  $("#mg-scan-count").textContent = list.length + " found · pick up to " + MAX_COMPETITORS;

  var wrap = el("div","mg-found");
  list.forEach(function(c,i){
    var row = el("label","mg-found__row");
    var cb = document.createElement("input");
    cb.type = "checkbox"; cb.value = c.name;
    cb.checked = i < 3 && state.competitors.length < MAX_COMPETITORS;
    if(cb.checked) addCompetitor(c.name);
    cb.addEventListener("change", function(){
      if(cb.checked){
        if(!addCompetitor(c.name)) cb.checked = false;
      } else {
        removeCompetitor(c.name);
      }
    });
    var body = el("div","mg-found__body");
    body.appendChild(el("b",null,c.name));
    body.appendChild(el("small",null,c.reason));
    var meta = el("div","mg-found__meta");
    meta.appendChild(el("i",null,c.score));
    meta.appendChild(el("span",null,"share of voice"));
    row.appendChild(cb); row.appendChild(body); row.appendChild(meta);
    wrap.appendChild(row);
  });
  var host = $("#mg-found");
  host.innerHTML = "";
  host.appendChild(wrap);
  renderTags(); renderPanel();
}

/* =====================================================================
   PROMPTS
   ===================================================================== */
function refreshPromptsForContext(force){
  /* once the user is editing prompts, context changes must not wipe their work */
  if(state.step >= 2 && !force) return;
  MambaGEO.adapters.suggestPrompts({
    vertical:state.vertical, market:state.market, brand:state.brand || "your brand"
  }).then(function(list){
    state.promptPool = list;
    var keptCustom = state.prompts.filter(function(p){return p.custom;});
    state.prompts = list.slice(0,5).map(function(t){return {text:t,on:true,custom:false};})
      .concat(keptCustom);
    renderPrompts(); renderPanel();
  });
}
function renderPrompts(){
  var host = $("#mg-prompt-list");
  host.innerHTML = "";
  state.prompts.forEach(function(p,i){
    var row = el("div","mg-prompt");
    var cb = document.createElement("input");
    cb.type="checkbox"; cb.checked=p.on;
    cb.setAttribute("aria-label","Track this prompt");
    cb.addEventListener("change", function(){ p.on = cb.checked; renderPanel(); });
    var tx = document.createElement("input");
    tx.type="text"; tx.className="mg-prompt__text"; tx.value=p.text;
    tx.setAttribute("aria-label","Prompt text");
    tx.addEventListener("input", function(){ p.text = tx.value; p.custom = true; renderPanel(); });
    var kill = el("button","mg-prompt__kill","×");
    kill.type="button";
    kill.setAttribute("aria-label","Remove prompt");
    kill.addEventListener("click", function(){
      state.prompts.splice(i,1); renderPrompts(); renderPanel();
    });
    row.appendChild(cb); row.appendChild(tx); row.appendChild(kill);
    host.appendChild(row);
  });
  $("#mg-prompt-add").disabled = state.prompts.length >= MAX_PROMPTS;
  $("#mg-prompt-more").disabled = state.prompts.length >= MAX_PROMPTS;
}

/* =====================================================================
   SUBMIT
   ===================================================================== */
function buildPayload(){
  return {
    brand: state.brand,
    domain: cleanDomain(state.domain),
    market: state.market,
    vertical: state.vertical,
    competitorSource: state.mode === "find" ? "mamba_identified" : "client_supplied",
    competitors: state.competitors.slice(),
    prompts: state.prompts.filter(function(p){return p.on && p.text.trim();}).map(function(p){return p.text.trim();}),
    engines: ENGINES.map(function(e){return e.id;}),
    trackingDays: TRACKING_DAYS,
    contact: {name:state.name, email:state.email},
    submittedAt: new Date().toISOString()
  };
}

/* =====================================================================
   WIRING
   ===================================================================== */
function init(){
  /* --- config from the Webflow embed's data attributes ---------------
     data-market    pre-selects a market (bind to a CMS City field)
     data-vertical  pre-selects the vertical (bind to a CMS Industry field)
     data-form-id   ID of the hidden Webflow form that captures the lead
     ------------------------------------------------------------------ */
  var dm = ROOT.getAttribute("data-market");
  if(dm && MARKETS.indexOf(dm) > -1) state.market = dm;
  var dv = ROOT.getAttribute("data-vertical");
  if(dv && PROMPT_LIB[dv]) { state.vertical = dv; }

  renderMarkets();
  var vs = $("#mg-vertical"); if(vs) vs.value = state.vertical;

  /* step 1 */
  var dom = $("#mg-domain");
  dom.addEventListener("input", function(){
    state.domain = dom.value;
    state.brand = brandFromDomain(dom.value);
    err("mg-err-domain", false);
    renderPanel();
  });
  dom.addEventListener("blur", function(){ refreshPromptsForContext(); });

  $("#mg-vertical").addEventListener("change", function(e){
    state.vertical = e.target.value;
    refreshPromptsForContext();
    if($("#mg-found").innerHTML) $("#mg-found").innerHTML = "";
  });

  /* mode switch */
  $$(".mg-mode").forEach(function(b){
    b.addEventListener("click", function(){
      state.mode = b.getAttribute("data-mode");
      $$(".mg-mode").forEach(function(x){ x.setAttribute("aria-pressed", x===b ? "true":"false"); });
      $$(".mg-pane").forEach(function(p){
        p.setAttribute("data-active", p.getAttribute("data-pane")===state.mode ? "1":"0");
      });
      err("mg-err-comp", false);
    });
  });

  /* competitor input */
  var ci = $("#mg-comp-input");
  $("#mg-tagbox").addEventListener("click", function(){ if(!ci.disabled) ci.focus(); });
  ci.addEventListener("keydown", function(e){
    if(e.key==="Enter" || e.key===","){
      e.preventDefault();
      if(addCompetitor(ci.value)) ci.value="";
      err("mg-err-comp", false);
    } else if(e.key==="Backspace" && !ci.value && state.competitors.length){
      removeCompetitor(state.competitors[state.competitors.length-1]);
    }
  });
  ci.addEventListener("paste", function(e){
    var txt = (e.clipboardData||window.clipboardData).getData("text");
    if(txt && /[,\n;]/.test(txt)){
      e.preventDefault();
      txt.split(/[,\n;]+/).forEach(function(part){ addCompetitor(part); });
      ci.value="";
    }
  });
  ci.addEventListener("blur", function(){ if(ci.value.trim()){ if(addCompetitor(ci.value)) ci.value=""; } });

  $("#mg-scan-go").addEventListener("click", runScan);

  /* prompts */
  $("#mg-prompt-add").addEventListener("click", function(){
    if(state.prompts.length >= MAX_PROMPTS) return;
    state.prompts.push({text:"", on:true, custom:true});
    renderPrompts();
    var inputs = $$(".mg-prompt__text");
    if(inputs.length) inputs[inputs.length-1].focus();
  });
  $("#mg-prompt-more").addEventListener("click", function(){
    var used = state.prompts.map(function(p){return p.text;});
    var next = state.promptPool.filter(function(t){return used.indexOf(t)===-1;}).slice(0,3);
    if(!next.length) return;
    next.forEach(function(t){
      if(state.prompts.length < MAX_PROMPTS) state.prompts.push({text:t,on:true,custom:false});
    });
    renderPrompts(); renderPanel();
  });

  /* navigation */
  $$("[data-go]").forEach(function(b){
    b.addEventListener("click", function(){
      var target = Number(b.getAttribute("data-go"));
      if(target===1){
        if(!cleanDomain(state.domain)){ err("mg-err-domain", true); dom.focus(); return; }
      }
      if(target===2){
        if(!state.competitors.length){
          err("mg-err-comp", true);
          $("#mg-err-comp").textContent = "Add at least one competitor, or let us identify them.";
          return;
        }
        if(!state.prompts.length) refreshPromptsForContext();
      }
      if(target===3){
        var live = state.prompts.filter(function(p){return p.on && p.text.trim();});
        if(!live.length){ err("mg-err-prompt", true); return; }
        err("mg-err-prompt", false);
      }
      goStep(target);
    });
  });
  $$("[data-back]").forEach(function(b){
    b.addEventListener("click", function(){ goStep(Number(b.getAttribute("data-back"))); });
  });

  /* submit */
  $("#mg-form").addEventListener("submit", function(e){
    e.preventDefault();
    state.name = $("#mg-name").value.trim();
    state.email = $("#mg-email").value.trim();
    if(!validEmail(state.email)){ err("mg-err-email", true); $("#mg-email").focus(); return; }
    err("mg-err-email", false);

    var btn = $("#mg-submit");
    btn.disabled = true;
    btn.firstChild.nodeValue = "Sending ";

    var payload = buildPayload();
    MambaGEO.adapters.submitLead(payload).then(function(){
      $("#mg-form").style.display = "none";
      $$(".mg-rail__seg").forEach(function(s){ s.setAttribute("data-on","1"); });
      var done = $("#mg-done");
      done.setAttribute("data-active","1");
      $("#mg-done-title").textContent = (state.brand ? state.brand + "'s report is queued." : "Your report is queued.");
      $("#mg-done-body").textContent =
        "We are tracking " + payload.prompts.length + " prompts against " +
        (payload.competitors.length + 1) + " brands across " + ENGINES.length +
        " engines. An analyst reviews every report before it leaves, because the data is the easy part.";
      $("#mg-payload").textContent = JSON.stringify(payload, null, 2);
      done.scrollIntoView({behavior:"smooth", block:"nearest"});
    });
  });

  $("#mg-restart").addEventListener("click", function(){
    window.location.reload();
  });


  /* first paint */
  refreshPromptsForContext();
  renderTags();
  renderPanel();
}

/* Self-mounting. Finds the embed anywhere on the page, so the Designer can
   place the component without any extra init code. */
function boot(){
  ROOT = document.querySelector("[data-mamba-geo]");
  if(!ROOT){ return; }
  if(ROOT.getAttribute("data-mg-mounted") === "1"){ return; }
  ROOT.setAttribute("data-mg-mounted","1");
  if(ROOT.className.indexOf("mg-geo") === -1){ ROOT.className += " mg-geo"; }
  ROOT.innerHTML = '<div class="mg-geo__wrap mg-geo__wrap--app"><div class="mg-stage">' + STAGE_HTML + '</div></div>';
  init();
}
if(document.readyState === "loading"){
  document.addEventListener("DOMContentLoaded", boot);
} else { boot(); }

window.MambaGEO = MambaGEO;
})();
