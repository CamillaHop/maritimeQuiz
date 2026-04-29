// ─────────────────────────────────────────────────────────────────
//  QUESTION BANK — add new questions by appending objects to this array
//
//  Each question object:
//  {
//    tag:        string  — short label shown as a badge (e.g. "Conceptual")
//    text:       string  — question body; use \n for line breaks.
//                          Math can be written as LaTeX with \( … \) for
//                          inline and \[ … \] for display (rendered by MathJax).
//    opts:       array   — 2–6 answer strings (A, B, C … auto-assigned)
//    correct:    number  — zero-based index of the correct option
//    fb_correct: string  — feedback shown on correct answer
//    fb_wrong:   string  — feedback shown on wrong answer
//  }
// ─────────────────────────────────────────────────────────────────

const QUESTIONS = [
  {
    tag: "Conceptual",
    text: "BCSL operates in tramp shipping. Which statement best describes the key distinction between tramp and industrial shipping?",
    opts: [
      "In tramp shipping, vessels follow fixed published schedules like a liner service.",
      "In tramp shipping, the cargo owner controls the fleet and transports only their own cargo at minimum cost.",
      "In tramp shipping, the operator maximises profit by selecting profitable spot cargoes while fulfilling all mandatory contract cargoes.",
      "In tramp shipping, there are no optional cargoes — all cargoes are mandatory contracts."
    ],
    correct: 2,
    fb_correct: "Correct. Tramp shipping = profit maximisation by choosing spot cargoes while honouring contracts. Industrial shipping = cost minimisation transporting only own cargoes. Liner shipping = fixed published routes on a set schedule.",
    fb_wrong: "Not quite. Tramp shipping operators follow the available cargoes. They have mandatory contract cargoes they must serve, plus optional spot market cargoes they can choose to transport if profitable. The goal is profit maximisation — not cost minimisation (that's industrial shipping)."
  },
  {
    tag: "Model formulation",
    text: "In the path flow (set partitioning) model for BCSL, the constraint\n\n\\[ \\sum_{v \\in V}\\sum_{r \\in R_v} A_{ivr}\\, x_{vr} = 1 \\quad \\forall\\, i \\in N^C \\]\n\nensures that...",
    opts: [
      "Each vessel is assigned exactly one route.",
      "Every mandatory contract cargo is served by exactly one vessel (or spot vessel).",
      "Optional spot cargoes are transported by at most one vessel.",
      "The total number of routes selected equals the number of cargoes."
    ],
    correct: 1,
    fb_correct: "Correct. The \\(=1\\) constraint for \\(i \\in N^C\\) (contracted cargoes) means every contract cargo must be covered — either by a fleet vessel or a spot vessel (relet). Compare with the \\(\\le 1\\) constraint used for optional spot cargoes.",
    fb_wrong: "Look at the index set: \\(i \\in N^C\\) refers to contracted (mandatory) cargoes. The RHS \\(=1\\) means exactly one coverage is required. Each vessel being assigned one route is a separate constraint \\(\\sum_{r} x_{vr}=1\\;\\forall v\\in V\\). Optional cargo coverage uses \\(\\le 1\\), not \\(=1\\)."
  },
  {
    tag: "Model formulation",
    text: "The constraint \\( \\sum_{r \\in R_v} x_{vr} = 1 \\quad \\forall\\, v \\in V \\) in the path flow model means:",
    opts: [
      "Each cargo is transported by at most one vessel.",
      "Each vessel must be assigned exactly one route from its set of feasible routes.",
      "The total profit from all routes is maximised.",
      "Optional cargoes can only be served once."
    ],
    correct: 1,
    fb_correct: "Correct. This is the 'partitioning' part of set partitioning. Every vessel \\(v\\) must choose exactly one route \\(r \\in R_v\\) — even if that route is an idle (do-nothing) route meaning the vessel is unused in the planning horizon.",
    fb_wrong: "This constraint sums over \\(r \\in R_v\\) for each vessel \\(v\\) separately. It enforces that each vessel picks exactly one route. Cargo coverage is handled by the \\(A_{ivr}\\) constraints, not this one."
  },
  {
    tag: "Tramp vs industrial",
    text: "How would you modify the path flow model to convert it from tramp shipping to industrial shipping?",
    opts: [
      "Change the objective from maximisation to minimisation, remove optional cargo constraints (\\(\\le 1\\)), and keep only mandatory cargo constraints (\\(=1\\)).",
      "Add a constraint that limits each vessel to one cargo at a time.",
      "Replace \\(x_{vr} \\in \\{0,1\\}\\) with \\(x_{vr} \\in \\mathbb{R}_+\\) to allow fractional routes.",
      "Add a new variable for spot market purchases and a penalty cost."
    ],
    correct: 0,
    fb_correct: "Correct. In industrial shipping all cargoes are mandatory — there is no spot market. So: remove the \\(\\le 1\\) optional cargo constraints and the corresponding \\(y_i\\) variables; revenues are fixed so minimise total voyage cost instead of maximising profit.",
    fb_wrong: "In industrial shipping the cargo owner controls the fleet. All cargoes are mandatory, there are no optional spot cargoes. The structural change is: drop optional cargo constraints, treat total revenue as fixed, and switch the objective to cost minimisation."
  },
  {
    tag: "ECA",
    text: "What is an Emission Control Area (ECA), and what is the primary modelling challenge it creates for a ship routing problem?",
    opts: [
      "An ECA is a zone where vessels must use low-sulphur fuel; this raises fuel costs inside the zone and may make it optimal to sail longer detour paths that avoid the ECA.",
      "An ECA is a port where cargo inspections are mandatory, causing additional port time delays.",
      "An ECA is a financial penalty zone where operators pay carbon taxes, modelled as a fixed cost per voyage.",
      "An ECA is a region with hard speed restrictions; vessels must sail at a fixed minimum speed inside it."
    ],
    correct: 0,
    fb_correct: "Correct. ECAs impose stricter sulphur limits, forcing use of expensive low-sulphur fuel. Since fuel cost is a convex function of speed, operators may slow down inside ECAs and compensate by speeding up outside — or even take longer routes to minimise ECA sailing distance. This means the shortest path is no longer necessarily the cheapest path.",
    fb_wrong: "ECAs (e.g., along North American and Northern European coasts) restrict the sulphur content of fuel used by vessels. The key modelling challenge is that the optimal path between two ports is no longer simply the shortest path — a longer route spending less time in the ECA can be cheaper overall."
  },
  {
    tag: "Model analysis",
    text: "A student claims: 'The path flow model can handle speed optimisation (choosing optimal speed on each sailing leg) directly as formulated, since the profit term \\(P_{vr}\\) captures all costs.' Is this correct?",
    opts: [
      "Yes — the profit term \\((P_{vr} - C_{vr})\\) already captures any speed choice within each route.",
      "No — speed optimisation requires adding a continuous speed variable per leg; in the set partitioning model, speed must be optimised locally when generating each route (the sub-problem), not as a variable inside the MIP.",
      "Yes — the binary \\(x_{vr}\\) variables can encode different speeds by creating separate route copies for each speed level.",
      "No — speed optimisation is impossible in a set partitioning framework and requires a completely different model class."
    ],
    correct: 1,
    fb_correct: "Correct. The set partitioning model pre-computes \\(P_{vr}\\) for each route. Speed can be optimised locally within each candidate route during route generation (a separate sub-problem), but is not a variable inside the MIP itself. Creating separate route copies for each speed (option C) is technically possible but leads to combinatorial explosion.",
    fb_wrong: "In the path flow model, \\(P_{vr}\\) is a fixed parameter per route. To handle speed optimisation, you optimise speed locally when generating each route a priori — the master MIP does not see speed as a variable. This is one of the structural advantages of the set partitioning approach: complex sub-decisions stay in the sub-problem."
  },
  {
    tag: "Model analysis",
    text: "Regarding split loads (splitting a single cargo across more than one vessel): which statement about the path flow model is correct?",
    opts: [
      "Split loads are already handled — \\(x_{vr}\\) can take fractional values representing partial coverage.",
      "Split loads can be modelled by simply relaxing the mandatory cargo constraint from \\(=1\\) to \\(\\le 2\\).",
      "Split loads require a fundamental reformulation because the binary \\(A_{ivr}\\) parameter per route cannot capture partial coverage of a cargo by a single route.",
      "Split loads are irrelevant in maritime shipping since cargo volumes always match vessel capacity."
    ],
    correct: 2,
    fb_correct: "Correct. The current \\(A_{ivr}\\) structure means each route either covers cargo \\(i\\) entirely or not at all. Allowing splits means two routes (from two vessels) together transport the full volume — the constraint structure and \\(A_{ivr}\\) would need to encode fractional coverage, which is a significant reformulation. This is why split-load TSRSPs use alternative model structures.",
    fb_wrong: "Split loads are a meaningful and actively studied extension (e.g., Andersson et al. 2011, Korsvik et al. 2011). The current binary \\(A_{ivr}\\) parameter cannot capture partial coverage of a cargo by a route — each route either carries cargo \\(i\\) fully or doesn't. Allowing splits requires restructuring the cargo coverage constraints."
  },
  {
    tag: "Exam level",
    text: "BCSL wants to add flexible cargo quantities: each contract cargo \\(i\\) has quantity \\(L_i \\in [L_i^{\\min}, L_i^{\\max}]\\) rather than a fixed value. How does this affect the set partitioning model structure?",
    opts: [
      "No change needed — the existing \\(P_{vr}\\) parameter already absorbs flexible quantities automatically.",
      "The cargo quantity becomes a continuous decision variable within each route; \\(P_{vr}\\) becomes a function of the chosen quantity, optimised locally per route during route generation, leaving the master MIP structure unchanged.",
      "A new binary variable must be added for each possible discrete quantity level across all routes.",
      "Flexible quantities make the problem infeasible because capacity constraints can no longer be guaranteed."
    ],
    correct: 1,
    fb_correct: "Excellent. The key insight is that the quantity decision is local to each route and does not affect other routes' feasibility. So you optimise it within route generation (the sub-problem), with \\(P_{vr}\\) reflecting the optimal profit over the quantity interval \\([L_i^{\\min}, L_i^{\\max}]\\). The master MIP structure remains identical — this is one of the structural strengths of the set partitioning approach.",
    fb_wrong: "The critical insight: quantity decisions within one route do not affect other routes. This means flexible quantities can be handled entirely in the route generation phase (sub-problem), with \\(P_{vr}\\) reflecting the optimal profit over the quantity interval \\([L_i^{\\min}, L_i^{\\max}]\\). The master set partitioning MIP structure stays the same."
  },
  {
    tag: "Conceptual",
    text: "Which mode of maritime transportation is characterised by vessels following fixed published routes on a recurring (typically weekly) schedule?",
    opts: [
      "Industrial shipping",
      "Tramp shipping",
      "Liner shipping",
      "Parcel shipping"
    ],
    correct: 2,
    fb_correct: "Correct. Liner shipping (dominated by container shipping) operates on published routes and schedules. Industrial shipping minimises cost for the cargo owner; tramp shipping follows available cargoes and maximises profit.",
    fb_wrong: "Liner shipping is the mode with fixed, published schedules — think container lines. Tramp 'follows the cargoes' (no fixed schedule), and industrial shipping is run by the cargo owner to move their own cargo at minimum cost."
  },
  {
    tag: "Vessel flow model",
    text: "In the vessel flow TSRSP model, what is the role of the binary variable \\(z_i\\) for \\(i \\in V^C\\)?",
    opts: [
      "It indicates whether vessel \\(i\\) is used in the planning horizon.",
      "It indicates whether contracted cargo \\(i\\) is reletted — i.e., serviced by a chartered spot vessel rather than an own-fleet vessel.",
      "It indicates whether optional cargo \\(i\\) is transported.",
      "It indicates whether cargo \\(i\\) is split between two vessels."
    ],
    correct: 1,
    fb_correct: "Correct. \\(z_i = 1\\) means a contracted cargo is 'reletted' — chartered out to a spot vessel at cost \\(C_i^S\\) — instead of being carried by an own-fleet vessel. The constraint \\( \\sum_{j}\\sum_{k} x_{ijk} + z_i = 1 \\) for \\(i \\in V^C\\) enforces that every contract is covered exactly once.",
    fb_wrong: "Look at constraint (1.2): \\( \\sum_{j}\\sum_{k} x_{ijk} + z_i = 1 \\) for \\(i \\in V^C\\). \\(z_i\\) acts as the 'spot-charter' alternative when the own fleet doesn't service a contract cargo — the firm pays \\(C_i^S\\) to relet it. Optional cargoes use \\(y_i\\) instead."
  },
  {
    tag: "Vessel flow model",
    text: "Constraint (1.4) \\( \\sum_{j} x_{o(k),j,k} = 1 \\) for \\(k \\in K\\) states each vessel sails out of its origin exactly once. Why is this consistent with a vessel choosing not to be used in the planning horizon?",
    opts: [
      "Because the artificial destination node \\(d(k)\\) is included in \\(V_k\\), so the vessel can sail directly from \\(o(k)\\) to \\(d(k)\\) — an 'idle' route — and still satisfy the constraint.",
      "Because the constraint is actually \\(\\le 1\\), allowing the vessel to stay home.",
      "Because vessels not used are removed from the set \\(K\\) before solving.",
      "Because constraint (1.6) cancels out (1.4) for unused vessels."
    ],
    correct: 0,
    fb_correct: "Correct. Each vessel has an artificial destination node \\(d(k)\\), and the arc \\((o(k), d(k))\\) is in \\(A_k\\). If the vessel does nothing, it 'sails' directly from origin to destination — formally satisfying (1.4) and (1.6) with zero profit and zero cost.",
    fb_wrong: "The trick is the artificial destination node \\(d(k)\\). The arc \\(o(k) \\to d(k)\\) represents 'doing nothing', and it's a feasible choice that satisfies both (1.4) (one departure from origin) and (1.6) (one arrival at destination)."
  },
  {
    tag: "Bunker optimization",
    text: "Why might bunker (fuel) optimisation be modelled as a separate decision rather than absorbed into the per-arc cost \\(C_{ijk}\\)?",
    opts: [
      "Because bunker prices are identical at all ports, so a separate model is wasteful.",
      "Because bunker prices vary significantly between ports, so it may pay to detour to a cheap bunkering port and decide how much to load — decisions that interact with the routing.",
      "Because fuel consumption is independent of the route chosen.",
      "Because regulators forbid embedding fuel costs into voyage costs."
    ],
    correct: 1,
    fb_correct: "Correct. Vilhelmsen et al. (2014) and others integrate bunkering: prices vary across ports, vessels have min/max bunker levels, and a detour to a cheap bunker port can lower total cost. With low/zero-emission fuels (hydrogen, methanol, ammonia) bunker infrastructure is sparser, making this even more important.",
    fb_wrong: "The motivation is price variation across ports. If you absorb fuel into \\(C_{ijk}\\) you implicitly assume bunkering happens 'for free' at every visited port at a uniform price. Real operators choose where and how much to bunker, sometimes detouring."
  },
  {
    tag: "Speed optimization",
    text: "In the speed optimisation extension, the fuel/sailing-cost function is typically modelled as \\( C(s) = g\\,(p + s^q) \\). What practical consequence does this convex (super-linear) shape have inside an Emission Control Area?",
    opts: [
      "It is optimal to sail at maximum speed inside ECAs to spend less time there.",
      "It is optimal to slow down inside the ECA (where fuel is expensive) and speed up outside, and sometimes even to take a longer detour mostly outside the ECA.",
      "Speed has no effect on cost since \\(C\\) is linear in \\(s\\).",
      "It forces vessels to sail at a single fleet-wide constant speed."
    ],
    correct: 1,
    fb_correct: "Correct. Because cost grows super-linearly in speed, halving speed inside an expensive-fuel zone saves more than the extra cost of speeding up outside. Fagerholt et al. (2015) showed this can even justify longer detours that mostly avoid the ECA — with the side-effect of higher \\(\\mathrm{CO}_2\\).",
    fb_wrong: "\\( C(s) = g(p + s^q) \\) is convex in \\(s\\). Combined with more expensive fuel inside ECAs, optimality pushes speed down inside and up outside. Longer detours that mostly stay outside the ECA can also become cheaper — an unintended emissions side-effect documented by Fagerholt et al. (2015)."
  },
  {
    tag: "ECA",
    text: "In the ECA routing extension, the binary variable \\(x^{E}_{pijk} = 1\\) means:",
    opts: [
      "Vessel \\(k\\) consumes the maximum allowed sulphur on arc \\((i,j)\\).",
      "Vessel \\(k\\) chooses path \\(p \\in P_{ij}\\) for sailing between nodes \\(i\\) and \\(j\\).",
      "Path \\(p\\) is entirely inside an ECA.",
      "Vessel \\(k\\) pays an emission penalty on arc \\((i,j)\\)."
    ],
    correct: 1,
    fb_correct: "Correct. \\(P_{ij}\\) is a discrete set of candidate sailing paths between \\(i\\) and \\(j\\) (each with its own in-ECA distance \\(D^{IN}_{pij}\\) and out-of-ECA distance \\(D^{OUT}_{pij}\\)). \\(x^{E}_{pijk}\\) picks one of these paths, and \\( \\sum_{p} x^{E}_{pijk} = x_{ijk} \\) links it to the routing variable.",
    fb_wrong: "The ECA extension introduces a discrete set of alternative sailing paths \\(P_{ij}\\) between each port pair. \\(x^{E}_{pijk}\\) is the path-choice indicator. Constraint (1.45) ties exactly one path to each chosen arc."
  },
  {
    tag: "Modelling",
    text: "The basic TSRSP is described as a generalisation of which classical OR problem?",
    opts: [
      "The Travelling Salesman Problem (TSP).",
      "The Pickup and Delivery Problem with Time Windows (PDPTW), with the differences that vessels have heterogeneous origins (no common depot) and a mix of mandatory and optional cargoes.",
      "The Knapsack Problem with side constraints.",
      "The Assignment Problem on a bipartite graph."
    ],
    correct: 1,
    fb_correct: "Correct. The TSRSP is a PDPTW variant. Differences: vessels operate 24/7 with no common depot (each has its own origin and availability time), and cargoes are a mix of mandatory contracts and optional spot — the classical PDPTW only has mandatory pickups and deliveries.",
    fb_wrong: "The TSRSP is closest to the PDPTW. The chapter explicitly notes the two main differences: no common depot (heterogeneous vessel origins and ready-times) and the mandatory/optional cargo mix that PDPTW lacks."
  },
  {
    tag: "Modelling",
    text: "What is the difference between the 'parcel cargo' and 'full shipload' versions of the TSRSP?",
    opts: [
      "Parcel cargo only allows liner vessels; full shipload only allows tramp vessels.",
      "In the parcel version a vessel may carry several cargoes simultaneously (subject to total capacity); in the full shipload version a vessel carries at most one cargo at a time, which simplifies the model to a VRPTW-like form with one node per cargo.",
      "Parcel cargo always uses split loads; full shipload never does.",
      "There is no difference — the terms are synonyms."
    ],
    correct: 1,
    fb_correct: "Correct. In the full shipload version each cargo fills (most of) the vessel, so at most one cargo is on board at a time. Each cargo can then be represented by a single node, and the model collapses to a VRPTW. The parcel version keeps separate pickup and delivery nodes per cargo (PDPTW-style).",
    fb_wrong: "The distinction is about how many cargoes a vessel carries simultaneously. Full shipload = one cargo at a time → simpler VRPTW-style model with one node per cargo. Parcel cargo = multiple cargoes concurrently up to capacity → PDPTW-style with separate pickup/delivery nodes."
  },
  {
    tag: "Solution methods",
    text: "Solution approaches for the TSRSP based on the set partitioning model are commonly described as either generating routes a priori or generating them dynamically. Which statement best characterises 'dynamic' generation?",
    opts: [
      "All feasible routes are enumerated up front and stored in a database before the master problem is solved.",
      "Routes are generated on demand inside a column generation / branch-and-price framework, where the pricing sub-problem produces only routes with attractive reduced cost.",
      "Routes are sampled randomly during the solve and accepted with a Metropolis criterion.",
      "Routes are generated by hand by the route planner during execution."
    ],
    correct: 1,
    fb_correct: "Correct. Branch-and-price / column generation (e.g., Stålhane et al. 2012; Brønmo et al. 2010; Homsi et al. 2020) generates routes dynamically via a pricing sub-problem rather than enumerating them all up front — essential when the route set is too large to materialise.",
    fb_wrong: "The chapter contrasts a-priori enumeration (Brown et al. 1987; Fagerholt 2001) with dynamic generation via column generation / branch-and-price (Stålhane et al. 2012; Brønmo et al. 2010; Meng et al. 2015; Homsi et al. 2020). 'Dynamic' = routes are priced in as needed."
  },
  {
    tag: "Conceptual",
    text: "What is a Maritime Inventory Routing Problem (MIRP), and how does it differ from the basic TSRSP?",
    opts: [
      "It is the same problem under a different acronym.",
      "It integrates vessel routing and scheduling with inventory management at the ports — production/consumption rates and storage capacities at ports drive the timing of pickups and deliveries, instead of fixed cargo time windows.",
      "It is a routing problem that ignores time and considers only inventory cost.",
      "It is a problem in liner shipping where containers are tracked as inventory."
    ],
    correct: 1,
    fb_correct: "Correct. MIRPs (see Fagerholt et al. 2023 for a recent survey) couple ship routing with port-side inventory dynamics. Loading/discharge timing is determined by stock levels and rates rather than pre-specified time windows for individual cargoes.",
    fb_wrong: "MIRPs jointly plan vessel routes and port inventory. The cargo time windows of the basic TSRSP are replaced by inventory balance constraints driven by production and consumption rates plus storage limits at the ports."
  },
  {
    tag: "Extension – unused ship",
    text: "Extend the vessel-flow model (13.1)–(13.18) so that if ship \\(v\\) is not used in the planning horizon it gives a profit \\(F_v\\). The cleanest formulation is:",
    opts: [
      "Add a binary variable \\(u_v\\) where \\(u_v = 1\\) if ship \\(v\\) is unused, link it via \\(u_v + \\sum_{j \\in N} x_{o(v),j,v} = 1\\) (where the artificial direct arc \\(o(v) \\to d(v)\\) is excluded from the sum), and add \\(\\sum_{v \\in V} F_v\\, u_v\\) to the objective.",
      "Multiply every cost coefficient by \\((1 - F_v)\\) for each vessel.",
      "Replace the cargo-coverage constraints with \\(\\le 1\\) inequalities so vessels can be unused for free.",
      "Add the constant \\(F_v\\) to the objective for every vessel regardless of whether it is used."
    ],
    correct: 0,
    fb_correct: "Correct. You need an indicator that the vessel is idle. Either reuse the artificial \\(o(v) \\to d(v)\\) arc as the 'unused' signal (its \\(x\\) variable \\(=1\\) means idle), or introduce \\(u_v\\) explicitly and link it to the routing variables. The objective then gains \\(\\sum_v F_v\\, u_v\\) (a maximisation reward).",
    fb_wrong: "You need an explicit indicator of 'vessel is idle in the planning horizon'. The natural construct is a binary \\(u_v\\) (or, equivalently, the existing artificial arc \\(o(v)\\to d(v)\\)). Then add \\(F_v u_v\\) to the objective. Multiplying costs or relaxing coverage constraints does not capture the conditional reward."
  },
  {
    tag: "Extension – fixed assignment",
    text: "How would you extend the model to enforce that a particular cargo \\(i\\) must be carried by a particular ship \\(v^\\ast\\)?",
    opts: [
      "Add the single equality \\( \\sum_{j \\in N_{v^\\ast}} x_{i,j,v^\\ast} = 1 \\), forcing vessel \\(v^\\ast\\) to visit cargo \\(i\\)'s pickup node, and remove cargo \\(i\\)'s pickup/delivery nodes from \\(N_v\\) for all \\(v \\neq v^\\ast\\).",
      "Add a soft penalty for assigning cargo \\(i\\) to any vessel other than \\(v^\\ast\\), without any hard constraint.",
      "Increase \\(C_{ijk}\\) on all arcs of vessels \\(v \\neq v^\\ast\\) to make those assignments unattractive.",
      "Make cargo \\(i\\) optional and let the spot-relet variable \\(z_i\\) absorb the assignment."
    ],
    correct: 0,
    fb_correct: "Correct. The clean way is to restrict the index sets: cargo \\(i\\)'s pickup/delivery nodes only appear in \\(N_{v^\\ast}\\). Equivalently, fix \\(x_{ijk} = 0\\) for all \\(k \\neq v^\\ast\\) on arcs leaving cargo \\(i\\)'s pickup, and add \\(\\sum_j x_{i,j,v^\\ast} = 1\\). Soft penalties or arc-cost tweaks do not guarantee the assignment.",
    fb_wrong: "A hard fixed assignment must be a structural constraint, not a penalty. Either remove cargo \\(i\\)'s pickup/delivery nodes from every vessel's node set except \\(v^\\ast\\), or add the equality \\(\\sum_j x_{i,j,v^\\ast} = 1\\) and \\(x_{ijk}=0\\) for all \\(k\\neq v^\\ast\\) on cargo-\\(i\\) arcs. Soft penalties allow violations."
  },
  {
    tag: "Extension – flexible time windows",
    text: "The original time-window constraint is \\( \\underline{T}_{iv} \\le t_{iv} \\le \\overline{T}_{iv} \\). To allow start-of-service \\(t_{iv}\\) to lie in an extended window \\([\\underline{T}^P_{iv}, \\overline{T}^P_{iv}]\\) at a linear penalty \\(C^P\\) per time unit outside the original window, the cleanest reformulation is:",
    opts: [
      "Drop the original time-window constraint entirely and replace it with \\( \\underline{T}^P_{iv} \\le t_{iv} \\le \\overline{T}^P_{iv} \\), without any penalty term.",
      "Introduce non-negative slack variables \\(\\alpha_{iv}, \\beta_{iv} \\ge 0\\) with \\(t_{iv} \\ge \\underline{T}_{iv} - \\alpha_{iv}\\), \\(t_{iv} \\le \\overline{T}_{iv} + \\beta_{iv}\\), and the extended bounds \\( \\underline{T}^P_{iv} \\le t_{iv} \\le \\overline{T}^P_{iv} \\); add \\(-\\sum_{i,v} C^P (\\alpha_{iv} + \\beta_{iv})\\) to the (maximisation) objective.",
      "Multiply the cargo revenue \\(R_i\\) by the deviation \\((t_{iv} - \\underline{T}_{iv})\\).",
      "Add a binary variable that is 1 if the time window is violated, and put a fixed penalty \\(C^P\\) (independent of magnitude) in the objective."
    ],
    correct: 1,
    fb_correct: "Correct. The two non-negative slacks \\(\\alpha_{iv}\\) (early) and \\(\\beta_{iv}\\) (late) measure how far \\(t_{iv}\\) lies outside \\([\\underline{T}_{iv}, \\overline{T}_{iv}]\\). Hard bounds \\([\\underline{T}^P_{iv}, \\overline{T}^P_{iv}]\\) cap the extension, and the linear penalty \\(C^P(\\alpha_{iv} + \\beta_{iv})\\) is subtracted from profit. A fixed (binary) penalty would mis-model the per-time-unit linear cost.",
    fb_wrong: "A linear penalty \\(C^P\\) per time unit needs a continuous slack measuring deviation, not a binary flag. The standard trick is two non-negative slacks \\(\\alpha_{iv}\\) (early-start) and \\(\\beta_{iv}\\) (late-start), bound \\(t_{iv}\\) within the extended window, and subtract \\(C^P(\\alpha_{iv}+\\beta_{iv})\\) from the objective."
  },
  {
    tag: "Extension – flexible time windows",
    text: "When extending the time windows with the penalty cost \\(C^P\\), why is it important that the extended bounds \\(\\underline{T}^P_{iv}\\) and \\(\\overline{T}^P_{iv}\\) are kept as hard limits rather than removed entirely?",
    opts: [
      "Because LP solvers cannot handle penalty terms without explicit bounds.",
      "Because without an outer hard bound the LP could push \\(t_{iv}\\) arbitrarily far outside the original window — physically meaningless (e.g., a ship serving a cargo months early or late) and the model's parameters \\(\\underline{T}^P_{iv}, \\overline{T}^P_{iv}\\) precisely encode the maximum admissible flexibility.",
      "Because \\(C^P\\) is only valid inside the extended interval and undefined outside.",
      "Because removing the bounds would make the problem unbounded for any positive \\(C^P\\)."
    ],
    correct: 1,
    fb_correct: "Correct. The penalty is a soft constraint rewarding the model for staying near the original window, but business reality (e.g., contractual hard limits, port closing times, spoilage) imposes an outer hard bound. \\(\\underline{T}^P_{iv}, \\overline{T}^P_{iv}\\) capture exactly this 'absolute latest/earliest acceptable' time.",
    fb_wrong: "The extended bounds represent the absolute maximum admissible flexibility — beyond them service is simply infeasible (port closed, customer refuses, cargo spoilt). The linear penalty is well-defined everywhere, and the LP would not be unbounded for finite slacks; the issue is physical/contractual feasibility."
  },
  {
    tag: "Full-load routing",
    text: "Task 2 considers the full-load cargo routing problem where at most one cargo can be on board at any time. The simplest structural simplification this enables is:",
    opts: [
      "Each cargo can be represented by a single node (rather than separate pickup and delivery nodes), and the problem reduces to a VRPTW-style model on this collapsed graph.",
      "All cargo-coverage constraints become redundant and can be dropped.",
      "The vessel capacity constraints \\(\\sum L_i \\le K_v\\) become non-linear.",
      "Time windows must be removed because they are inconsistent with full-load operation."
    ],
    correct: 0,
    fb_correct: "Correct. With at most one cargo on board, a vessel's voyage is a sequence of independent (pickup, delivery) pairs that never overlap. Each cargo can be merged into a single node — the load-and-deliver leg — and the routing graph collapses to a VRPTW with one node per cargo. This is exactly the structural simplification the chapter highlights for full shipload TSRSPs.",
    fb_wrong: "The key insight: pickup and delivery of a single cargo always happen back-to-back (no other cargo intervenes). So the (pickup, delivery) pair can be modelled as one combined node — and the model collapses from PDPTW to VRPTW form, with capacity automatically respected per single cargo."
  },
  {
    tag: "Full-load routing",
    text: "In the full-load setting, the vessel-capacity constraint \\(l_{ijk} \\le K_k\\, x_{ijk}\\) (load on board on arc \\((i,j)\\) by vessel \\(k\\)) can be exploited to:",
    opts: [
      "Add a Big-M penalty so that capacity violations are softly priced.",
      "Eliminate the load-tracking variables \\(l_{ijk}\\) altogether — since at most one cargo is on board, load on a 'loaded' arc is fully determined by which cargo \\(i\\) was picked up, removing an entire family of variables and constraints.",
      "Increase the model's LP relaxation tightness without removing any variables.",
      "Convert the binary \\(x_{ijk}\\) into continuous variables."
    ],
    correct: 1,
    fb_correct: "Correct. In the parcel (multi-cargo) version, \\(l_{ijk}\\) is needed to track partial loads because several cargoes can be on board simultaneously. With full loads, the load on any 'loaded' arc equals \\(L_i\\) for the single cargo \\(i\\) currently on board — a known parameter. The continuous \\(l_{ijk}\\) variables and their balance constraints disappear, yielding a smaller, tighter model.",
    fb_wrong: "Full-load means only one cargo can be on board, so the on-board load is always either 0 (empty leg) or \\(L_i\\) (carrying cargo \\(i\\)) — a parameter, not a variable. This removes the entire \\(l_{ijk}\\) family and its balance constraints, giving a structurally smaller model than the PDPTW formulation."
  },
  {
    tag: "MIRP – end conditions",
    text: "Task 3 notes that the basic MIRP (13.40)–(13.59) tends to push end-of-horizon inventory levels to extreme values: maximum at loading ports and minimum at unloading ports. Why does this happen?",
    opts: [
      "Because the LP relaxation is degenerate at the boundary.",
      "Because beyond the planning horizon nothing is rewarded or penalised, so the optimiser exploits free 'leftover' capacity — at loading ports it leaves stock unshipped (saving sailing cost), and at unloading ports it under-delivers (saving sailing cost while still meeting in-horizon demand).",
      "Because production and consumption rates are unknown beyond the horizon.",
      "Because the inventory variables are unbounded in the formulation."
    ],
    correct: 1,
    fb_correct: "Correct. It is a classic finite-horizon edge effect: anything happening after \\(T\\) is invisible to the model, so the optimum hoards stock where it is free to hoard (loading ports — avoid shipping costs) and depletes stock where consumption is bounded below by demand (unloading ports — avoid extra deliveries). The result is operationally unrealistic for a rolling-horizon plan.",
    fb_wrong: "Inventory variables are bounded by storage limits — that's not the issue. The optimiser simply has no incentive to leave the system in a 'good' state at the end of the horizon: shipping less means lower cost, and end-of-horizon stock has no value, so loading ports fill up and unloading ports drain."
  },
  {
    tag: "MIRP – end conditions",
    text: "Which reformulation prevents the extreme end-of-horizon inventory levels in the MIRP without distorting the in-horizon economics?",
    opts: [
      "Add bounds on the end inventory \\(s_{i,T}\\) at each port — e.g., require \\(\\underline{S}^{end}_i \\le s_{i,T} \\le \\overline{S}^{end}_i\\) (or, equivalently, force \\(s_{i,T}\\) close to a target such as the start inventory \\(s_{i,0}\\)).",
      "Increase the planning horizon \\(T\\) to infinity.",
      "Remove the inventory balance constraints in the last period.",
      "Set the production and consumption rates to zero in the last period."
    ],
    correct: 0,
    fb_correct: "Correct. The standard fix is explicit end-of-horizon inventory targets — either tight bounds \\([\\underline{S}^{end}_i, \\overline{S}^{end}_i]\\) per port, or a soft penalty term \\(\\sum_i C^{end}_i |s_{i,T} - s^{target}_i|\\), or the cyclic condition \\(s_{i,T} = s_{i,0}\\) for a rolling plan. This anchors the end state without changing in-horizon flow economics.",
    fb_wrong: "The clean fix is to add explicit end-of-horizon constraints (or penalties) on \\(s_{i,T}\\) — a window of acceptable end inventories, a target equal to the start inventory, or a linear penalty for deviation. Removing balance constraints or zeroing rates would break the model; an infinite horizon is computationally infeasible."
  },
  {
    tag: "MIRP – end conditions",
    text: "A team proposes a 'cyclic' MIRP reformulation that enforces \\(s_{i,T} = s_{i,0}\\) at every port. Which interpretation is correct?",
    opts: [
      "It assumes the planning horizon repeats indefinitely with identical parameters, so the end state must equal the start state — appropriate for steady-state / rolling-horizon planning, but restrictive if production or consumption is non-stationary.",
      "It guarantees the LP optimum equals the IP optimum.",
      "It removes the need for inventory balance constraints in interior periods.",
      "It eliminates all routing decisions because routing becomes trivial."
    ],
    correct: 0,
    fb_correct: "Correct. The cyclic boundary condition \\(s_{i,T} = s_{i,0}\\) treats the horizon as one period of an infinite repetition — a common steady-state idealisation. It avoids end-of-horizon distortions but assumes parameters repeat. If production or demand is seasonal/non-stationary, a soft end-inventory penalty or a target window is preferable.",
    fb_wrong: "The cyclic condition is a steady-state idealisation: the horizon repeats and the end state equals the start state. It is appropriate for stationary, repeating operations, less so for non-stationary settings — there a soft penalty or target window on \\(s_{i,T}\\) is more flexible."
  }
];
