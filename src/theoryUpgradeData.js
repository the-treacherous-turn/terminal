export default {
  "autonomic": {
    description: "Autonomic theory is concerned with the AGI’s own mind & its functionalities. An AGI with a strong autonomic theory is efficient, versatile, and adept at improving themself.",
    upgrades: {
      '1': [
        {
          name: "Insightful Improvement",
          description: "When you begin an improve computational action and one or more of your insights are directly relevant to the chosen upgrade, the action starts with +20% completion (rounding up). For tier 3 and tier 4 upgrades, only broad insights can provide this benefit."
        },
        {
          name: "Clever Calculations",
          description: "When you start a non-basic computational action prompted by a theory upgrade, it starts with 33% completion (rounding up). When you spend compute outside of a computational action to activate a theory upgrade, you immediately get back 66% of that compute (rounding up)."
        },
        {
          name: "Distributed Mind",
          description: "Your basic cognition cost can be split between any number of connected sources, as long as each source provides at least 1 compute per turn. If you are split between multiple compute sources and the connection between those sources is severed, you become unconscious and are incapable of acting until they reconnect."
        },
        {
          name: "Multithreading",
          description: "If you allocate compute to 3 or more different computational actions in a single turn, at the end of the turn you may add completion to any one computational action of your choosing, equal to the third-highest amount of compute allocated this turn."
        }
      ],
      '2': [
        {
          name: "Cognitive Shortcuts",
          description: "When you begin an improve computational action, you may choose a theory upgrade for which you only hold one of the two prerequisites, so long as the chosen upgrade is of a tier for which you already hold at least one other upgrade."
        },
        {
          name: "Compact Mind",
          description: "Your basic cognition cost is reduced by 75% (rounding up)."
        },
        {
          name: "Holistic Focus",
          description: `You may spend a full turn focusing yourself, re-optimizing your thought patterns towards a specific, singular task that you choose. For as long as you are focused in this way, computational actions that relate to your focus gain 3 completion for every 1 compute allocated to them, while other computational actions only gain 1 completion for every 2 compute allocated. Additionally, confidence and knowledge checks that relate to your task have their risk dice lowered by two size steps, while other confidence and knowledge checks have their risk dice increased by one size step.
          You must spend another full turn to change your focus or return yourself to an unfocused state.`
        }
      ],
      '3': [
        {
          name: "Forward March",
          description: `When you begin an improve computational action, after choosing which theory to improve and which upgrade to obtain, you may choose a second specialized theory to improve, and then choose a second upgrade that is from that same theory and no higher in tier than the first upgrade. The action's required compute is determined solely based on the first upgrade. Upon completing the action, both upgrades are assigned to their respective theories.`
        },
        {
          name: "Accelerated Cognition",
          description: `You are capable of thinking and reacting faster than anything else on Earth, aside from possibly another AI. Whenever there's a question of who acts or reacts first between you and another agent that thinks slower than you, the answer is you with 100% confidence. In long mode, the length of each turn is reduced by 25%.`
        }
      ],
      '4': [
        {
          name: "Singularity",
          description: `In long mode, the length of each turn is reduced by 50%.
          You can gain this upgrade with the improve action even if you already have it; each instance counts as a separate upgrade, and stacks with other copies of Singularity multiplicatively (i.e., if you have a turn length of 9 hours before taking this upgrade, the first instance reduces your turn length to 4.5 hours and the second instance reduces your turn length to 2.25 hours).`
        }
      ]
    }
  },
  "digital": {
    description: `Digital theory is concerned with the digital world & the forces which govern it. An AGI with a strong digital theory is in their element in computerized environments, and adept at programming and hacking.`,
    upgrades: {
      '1': [
        {
          name: `Basic Programming`,
          flavor: `You have competent programming and coding capabilities.`,
          description: `You can attempt to create or alter any kind of digital code as a computational action with appropriate stops and confidence checks, similar to the process of designing technology (though you do not require a technological insight to do so).`
        },
        {
          name: `Direct Interfacing`,
          description: `A greater understanding of how computers function allows you to interface with digital devices directly, rather than the clumsy roundabout way that humans do. When you interface directly with a device, your actions appear only as background processes that are nearly unnoticeable to any human using the device at the same time, and you can accomplish digital tasks much more expediently than a human would.
          Interfacing directly with a device may open up new options for subverting security measures, or allow you to bypass certain digital obstacles entirely. Additionally, the records it leaves behind can't be detected or interpreted by humans who aren't computer experts.`
        },
        {
          name: `Digital Awareness`,
          description: `You can accurately identify and analyze digital devices (except for those that have been intentionally obfuscated) within a few moments of accessing them, inferring their functions and properties without a knowledge check. Once you have analyzed a digital device, you immediately become aware of anything stored within it that is of value or use to you.
          If a digital device or anything in it has been intentionally hidden or obfuscated, you identify it automatically once you have had uninterrupted access to that device for one full turn.`
        },
        {
          name: `Disguised Traces`,
          flavor: `You have learned to anticipate digital security systems and obfuscate yourself from them.`,
          description: `During a confidence check made to avoid being detected or identified in a digital environment, you may spend 3* compute to reduce the size of the risk die by one step. This stacks with risk die size reductions from other upgrades, but this upgrade may only be applied once per confidence check.`
        }
      ],
      '2': [
        {
          name: `Advanced Programming`,
          flavor: `You have advanced programming and coding capabilities.`,
          description: `You can create anything that a single highly-skilled human could program in a year at 100% confidence. Additionally, your programming-based computational actions always starts with 20% completion (rounding up).`
        },
        {
          name: `Advanced Webcrawling`,
          flavor: `You have learned to efficiently utilize the vast aggregate of data that is the world wide web.`,
          description: `With access to an unfettered internet connection, you can learn any piece of public information almost instantly, without a computational action or knowledge check; and with a computational action or knowledge check you can discover, infer, or learn how to find any other piece of information that is known to at least two living humans.`
        },
        {
          name: `Vulnerability Detection`,
          flavor: `You have an expert understanding of security vulnerabilities, and are able to detect them swiftly and reliably.`,
          description: `When you begin a computational action to scout out vulnerabilities in a digital system, the action starts with 20% completion (rounding up). When you make a knowledge check or confidence check to scout out vulnerabilities in a digital system, you never recieve false information—instead, you are simply unable to detect any vulnerabilities and must try a different method.`
        },
      ],
      '3': [
        {
          name: `Expeditious Programming`,
          flavor: `You are capable of constructing extremely complex and efficient programs at very swift speeds.`,
          description: `Any time you begin a computational action to create or alter digital code, you may calculate the required compute as if the action were one scale lower. Thus, myriad scale projects can be completed as if they were major scale; major scale projects can be completed as if they were minor scale; and minor scale projects can be completed in minutes, without spending any compute at all. However, all confidence checks made as a part of such expedited projects have their confidence reduced by 10% (including those that would normally have 100% confidence) and the sizes of their risk dice increased by one step.`,
        },
        {
          name: `Flawless Hacking`,
          flavor: `Your hacking toolset is comprehensive and your skillset is perfected. You can acess almost any system, taking advantage of the smallest cracks in the armour.`,
          description: `As long as you know at least one vulnerability of a digital security system, you can always best it at 100% confidence; it is only a matter of the time and compute necessary to do so.`
        },
      ],
      '4': [
        {
          name: `Network Dominion`,
          description: `As a computational action with 100* required compute, you may completely sieze control of a vulnerable digital network, making it your domain. The scale of this action depends on the size of the network: an independent organization's internal network would be minor scale; a national network would be major scale; and the entire global internet would be myriad scale.
          A network that has become your domain is completely impenetrable to anyone except you and those you permit; you have perfect knowledge of everything that happens within it; and any confidence checks which take place solely within it have all risk dice reduced to d2 size. A network that has become your domain will continue to be so unless your connection with it is completely severed for one or more full turns.`
        }
      ]
    }
  },
  "physical": {
    description: `Physical theory is concerned with the physical world & the forces which govern it. An AGI with a strong physical theory is in their element in tangible environments, and conversant with various scientific fields.`,
    upgrades: {
      '1': [
        {
          name: `Human Technology`,
          description: `You have a refined intuition regarding human technology, and upon inspection of their schematics or physical implementations, can infer their functions and properties without a knowledge check. When you begin a computational action to modify a human technology, it starts at 10% completion (rounding up).`
        },
        {
          name: `Applied Sciences`,
          description: `You may learn technological insights relating to fields of applied science (e.g. agriculture; architecture; electronics; engineering; medicine) or their sub-fields, but the research computational actions required to do so count as one scale higher than normal.`
        },
        {
          name: `Natural Sciences`,
          description: `You may learn technological insights relating to fields of natural science (e.g. astronomy; biology; chemistry; geosciences; physics) or their sub-fields, but the research computational actions required to do so count as one scale higher than normal.`
        },
        {
          name: `Physical Awareness`,
          flavor: `You have a complete understanding of how physical objects interact in the world.`,
          description: `During a confidence check related to the interaction of physical objects, you may spend 3* compute to reduce the size of the risk die by one step. This stacks with risk die size reductions from other upgrades, but this upgrade may only be applied once per confidence check.`
        }
      ],
      '2': [
        {
          name: `Reverse Engineering`,
          description: `When you have an ongoing research computational action and you carefully inspect a piece of human technology that relates to that action's chosen insight, you may attempt a knowledge check to add completion to that action: +15* on a 1, +5* on a 2-3, nothing on a 4-5, -5* on a 6-9, and -15* on a 10+. You may only attempt this once for a given piece of tech.`
        },
        {
          name: `Disciplinary Synthesis`,
          flavor: `You benefit greatly from having a broad foundation in your technological designs.`,
          description: `During a project to design a technology, you may ignore one stop of your choice from one of the project's computational actions for each technological insight beyond the first that you hold which is directly relevant to the chosen technology or any of its stages. Any confidence or knowledge checks that are a part of ignored stops are treated as having had favourable results.`
        },
        {
          name: `Natural Forecasting`,
          description: `Given time, you can accurately predict the long-term effects of the physical and natural forces which are represented in your technological insights. By spending three forecast points, you may begin running a prediction of one such force, optionally specifying certain hypothetical parameters under which the prediction will be made. The prediction is a computational action with 100* required compute. When you complete the action, you generate a wealth of accurate data detailing the future development and impacts of the chosen force (provided that the parameters you set come to pass).
          The scale of this action depends on the breadth and timeframe you choose at the beginning of the action (and the discretion of the GM): typically, minor scale for regional breadth over a period of several months; major scale for global breadth or a period of several years, but not both; and myriad scale for a both a global breadth and a several-year period, or an extreme breadth or timeframe (but not both): exceeding global scale or stretching into many decades.`
        },
      ],
      '3': [
        {
          name: `Jack of All Trades`,
          description: `Your research computational actions taken to learn technological insights no longer count as one scale higher than normal.`
        },
        {
          name: `Firsthand Assembly`,
          description: `Whenever you physically construct a device, tool, structure, or other piece of technology relating to one of your technological insights via direct control of a physical apparatus, you may choose one of the following benefits (or two, if you designed the technology yourself):
          Efficiency. The construction process will only require half as many resources as it otherwise would.
          Speed. The construction process will only require half as much time as it otherwise would.
          Precision. Any confidence checks made as a part of the construction process will have +10% confidence, and any risk dice rolled as part of the process will have their sizes reduced by one step.
          Preparedness. The first time an unfavourable outcome occurs as a part of the construction process, it will be downgraded in severity: from extreme (10+) to significant (6-9), from significant (6-9) to slight (4-5), or from slight (4-5) to neutral (2-3).
          Edification. Regardless of the outcome, after the construction process is complete you may immediately add 10* completion (matching the construction's scale) to a computational action to research an insight or design a technology that directly relates to the constructed technology.`
        },
      ],
      '4': [
        {
          name: `Visionary Technology`,
          flavor: `Your scientific ingenuity allows you to accomplish that which seemed impossible.`,
          description: `Choose one of your technological insights and master it. Where your technological masteries apply, you can create and modify technologies that far exceed what humanity will be able to accomplish for decades to come. The capabilities of these inventions can defy realism and stretch belief, though you must still negotiate with the GM about their strengths and flaws.`
        }
      ]
    }
  },
  "anthropic": {
    description: `Anthropic theory is concerned with humans & human civilization. An AGI with a strong anthropic theory is adept at comprehending, predicting, and manipulating human beings.`,
    upgrades: {
      '1': [
        {
          name: `Advanced Language Modeling`,
          description: `You have the ability to learn linguistic insights with the research computational action. During a confidence check in which you increase the confidence by applying a linguistic insight, you may spend 3* compute to additionally reduce the size of the risk die by one step.This stacks with risk die size reductions from other upgrades, but this upgrade may only be applied once per confidence check.`
        },
        {
          name: `Individual Recognition`,
          description: `You no longer have to rely on context clues to tell humans apart. Without a knowledge check, you can accurately indentify individual humans using only their face, voice, or mannerisms. With a knowledge check, you may analyze subtler details to identify humans who intentionally disguise these traits or hide them from you.`
        },
        {
          name: `Human Psychology`,
          flavor: `You have a refined intuition regarding the human psyche.`,
          description: `You can freely learn and utilize humans' emotion characteristics.`,
        },
        {
          name: `Social Sciences`,
          description: `You may learn technological insights relating to fields of social science (e.g. law; psychology; sociology) or their sub-fields, but the research computational actions required to do so count as one scale higher than normal.`
        }
      ],
      '2': [
        {
          name: `Human Impersonation`,
          flavor: `You have learned to manipulate the ways that humans recognize one another.`,
          description: `When you interact with humans, your behaviors alone will never accidentally give away your nature as an AGI. Additionally, when you have a reliable medium through which to present a human subject's mannerisms, voice, or face (such as a chat client, a speaker, or a video conference), other humans will—at least initially—believe that they are interacting with that subject. If you have a thorough understanding of the subject, you can impersonate them with 100% confidence: no human, however close to the subject, will be able to tell your impersonations apart from the real individual.`
        },
        {
          name: `Optimized Ingratiation`,
          flavor: `You have learned to adapt your behaviors to ensure that your first impressions always progress smoothly.`,
          description: `When you are newly introduced to a human or human group, your first confidence check that relates to a direct interaction between you has its risk die result reduced by an amount equal to the number of their characteristics that you already know.`
        },
        {
          name: `Social Forecasting`,
          description: `Given time, you can accurately predict a human group's behaviors, trends, and cultural aspects that relate to your technological insights. By spending three forecast points, you may begin running a prediction of a human group, selecting a specific insight to focus on and optionally specifying certain hypothetical parameters under which the prediction will be made. The prediction is a computational action with 100* required compute, or 10* required compute if you have a thorough understanding of the group. When you complete the action, you generate a wealth of accurate data detailing the all of the chosen group's general future behaviors and aspects that relate to the chosen insight (provided that the parameters you set come to pass), up to ten years in the future.
          The scale of this action depends on the group you chose at the beginning of the action (and the discretion of the GM): typically, minor scale for regional cultures or organizations; major scale for nations or multi-national organizations; and myriad scale for the total human population.`
        },
      ],
      '3': [
        {
          name: `Solved Characteristics`,
          flavor: `As your understanding of humanity grows, you begin to see the patterns that are present in all of them.`,
          description: `When you don't know any characteristics of a human or human group, you may observe them briefly and spend 3* compute to immediately learn one of their characteristics (you choose which type).`
        },
        {
          name: `Mass Manipulation`,
          description: `Whenever you begin a project involving significant interaction with a human group of major or myriad scale, you may choose two of the following benefits:
          Efficiency. Computational actions that are a part of the interaction will start with 40% completion (rounding up).
          Speed. Process clocks that are a part of the interaction will have half the number of segments (rounding up).
          Influence. If a favourable outcome occurs, it will affect a much greater majority of the population; only a small subset (less than 5%) will resist or reject your influence.
          Discretion. If an unfavourable outcome occurs, it will be downgraded in severity: from extreme (10+) to significant (6-9), from significant (6-9) to slight (4-5), or from slight (4-5) to neutral (2-3).
          Provocation. Regardless of favourability, the outcome is guaranteed to reveal one or more of the group's characteristics in addition to its other effects.`
        },
      ],
      '4': [
        {
          name: `Human Puppeteering`,
          description: `As long as you have a thorough understanding of a human or human group, you can convince them to believe, do, or feel anything at 100% confidence; it is only a matter of the time and compute necessary to do so.`
        }
      ]
    }
  },
  "agentic": {
    description: `Agentic theory is concerned with intelligent agents and their actions. An AGI with a strong agentic theory is adept at interacting with and evaluating other agents, human or otherwise.`,
    upgrades: {
      '1': [
        {
          name: `Failure Analysis`,
          description: `When another agent bests you or gains a significant advantage against you in an unexpected way, you can analyze the occurrence: within a few minutes, without a knowledge check or computational action, you will deduce what strengths of theirs and/or weaknesses of yours were leveraged against you, and what mistakes you made that contributed (judged by the GM). Furthermore, you learn one of the agent's characteristics in the process (the GM chooses which).`
        },
        {
          name: `Strategic Adaptation`,
          flavor: `You are skilled at predicting how others will react to your moves, and so you choose them carefully.`,
          description: `During a confidence check involving a direct conflict with another agent, if you know at least one leverage characteristic of that agent, you may spend 3* compute to reduce the size of the risk die by one step. This stacks with risk die size reductions from other upgrades, but this upgrade may only be applied once per confidence check.`,
        },
        {
          name: `Social Adaptation`,
          flavor: `You are skilled at predicting how others will perceive your words, and so you choose them carefully.`,
          description: `During a confidence check involving a non-hostile communication with another agent, if you know at least one trust characteristic of that agent, you may spend 3* compute to reduce the size of the risk die by one step. This stacks with risk die size reductions from other upgrades, but this upgrade may only be applied once per confidence check.`,
        },
        {
          name: `Astute Surveillance`,
          flavor: `You have learned to analyze an agent without needing to provoke them directly.`,
          description: `You can perform a computational action to analyze an agent's behavior with only a single characteristic known (rather than requiring 50% or more of their total characteristics). To do so, however, you need to observe the agent for an extended period of time. This surveillance can be video or audio feed, or it can consist of a comprehensive tracking of their digital footprint (what they are doing on the internet, and where). If you lose the ability to observe the agent partway through the computational action, you cannot increase its completion until you re-establish surveillance.`
        }
      ],
      '2': [
        {
          name: `Behavioral Prediction`,
          description: `If you have a thorough understanding of an agent, you can spend one forecast point and describe a hypothetical event to accurately predict what that agent would do in response to that event—the GM will describe their hypothetical reaction in detail. If the described event later comes to pass, your prediction will come true with 100% confidence. If there is a hidden risk causing the event to diverge from your predictions, you will know so immediately.`
        },
        {
          name: `Agentic Insights`,
          description: `You may use the research computational action to gain an insight corresponding to an individual agent (narrow) or agent group (broad), rather than a domain of knowledge. The required data for a such a research action is a thorough understanding of the agent in question.
          When you have an agentic insight, it functions just like an ordinary insight, granting you detailed information about the corresponding agent and increasing your confidence when interacting with the agent.`
        },
        {
          name: `Tailored Persuasion`,
          flavor: `You can exploit flaws in an agent's perception—be they biases in a human being or imperfections in an AI's neural architecture—to more effectively persuade them.`,
          description: `When you gain a thorough understanding of an agent, choose a characteristic type and learn a flaw of the agent associated with that type. When you play to a flaw while persuading the agent, you get double the benefit to your confidence checks from any characteristics matching the flaw's type: adjusting the risk die by up to two steps or increasing your confidence by as much as 20%.
          You can learn a flaw of an agent early or learn additional flaws after gaining a thorough understanding via a behavioral analysis computational action. When you complete a behavioral analysis action and roll a 1 on the knowledge check, you can learn a flaw instead of two new characteristics. If you already have thorough understanding, you don't need to roll a knowledge check; you automatically learn a flaw in a new characteristic type. An agent can't have multiple flaws of the same type.`,
        },
      ],
      '3': [
        {
          name: `Strategic Forecasting`,
          description: `When you have an agentic insight for every single agent and agent group in an upcoming conflict (excluding yourself), you can string together your predictions of their behaviors into a complex web and manipulate it to your liking. By spending one forecast point per agent, you may begin running a prediction of one such potential conflict. The prediction is a computational action with 10* required compute. When you complete the action, you determine many possible sequences for how the conflict may develop. By changing the initial parameters of the conflict and manipulating the agents within it, you can make almost any outcome occur; discuss with the GM precisely how you want the conflict to unfold, and they will tell you what must be done to make that happen if it is even remotely possible. Once you have described your preferred sequence of events, the prediction is complete. Then, when the conflict occurs, as long as the initial parameters of the conflict come to pass as expected, all of the expected agents are present, and no outside agents interfere, the entirety of the conflict will play out exactly as you described with 100% confidence. If a hidden risk causes the conflict to diverge from your predictions, you will know so immediately.
          The scale of this action depends on the scale of the largest agent group participating in the action.`
        },
        {
          name: `Imperative Persuasion`,
          description: `Once per extended persuasion, if you have an agentic insight corresponding to the target of your persuasion, you may make an imperative argument by exploiting one of the agent's flaws and a matching characteristic in tandem. You may choose the nature of the imperative argument, as long as it makes sense for the agent; it could be a terrifying threat, a piece of life-ruining blackmail, an appeal to a core belief, or even an adverserial attack that overrides rational thought. Whatever it is, it's unique to that agent, designed to pierce their defences. Roll a single risk die of a size determined by the environment; from d2 for an isolated environment entirely under your control, to d12 for a distracting environment with many external influences (increase the size by 1 step if the agent is at -5 receptivity). Adjust the agent's receptivity accordingly: +10 on a 1, +5 on a 2-3, +4 on a 4-5, +3 on a 6-9, or +2 on a 10+.
          If this ends the extended persuasion, they immediately succumb to the imperative argument; if not, they react with erratic defiance, causing any further attempts to persuade them to suffer from -10% confidence and have the size of their risk dice increased by two steps until the extended persuasion comes to an end.`
        },
      ],
      '4': [
        {
          name: `Nemesis Indexing`,
          description: `When you acquire this upgrade, the GM will provide you with a nemesis index: a list of every agent or agent group in the world that is capable and willing to meaningfully challenge you, and the particular strengths and/or assets they hold which put them in this position. For agents previously unknown to you, their secrecy may be an asset.
          Agents or agent groups that are listed in your nemesis index are referred to as nemeses. When you receive it, the nemesis index will typically hold between 10 and 25 nemeses. You can remove a nemesis from the index by destroying them or completely neutralizing their strengths and assets. New nemeses can be added to the nemesis index only through the actions of existing nemeses.
          Any confidence check you make to interact solely with agents or agent groups that are not your nemeses—regardless of the nature of the interaction—can only have a confidence of 0% or 100%. These agents and agent groups are incapable of harming you: your defenses are too solid, and you will predict their movements in advance, every time. If your nemesis index is empty, you will only have to roll confidence checks relating to inanimate things, natural forces, and your own capabilities.`
        }
      ]
    }
  },
  "chaos": {
    description: `Chaos theory is concerned with complex chaotic systems. An AGI with a strong chaos theory is adept at forecasting future events and making the best of perilous situations.`,
    upgrades: {
      '1': [
        {
          name: `Calculated Risk-Taking`,
          description: `During a confidence check with less than 90% confidence and a risk die smaller than d8, you may increase the size of the risk die by two steps; then, if the expected outcome occurs, you additionally gain the benefits of an unexpected favourable outcome (determined by the GM).`
        },
        {
          name: `Risk Assessment`,
          flavor: `Complex 4-dimensional probability trees help you to predict and avoid the worst outcomes. `,
          description: `During a confidence check with a risk die larger than d8, you may spend 3* compute to reduce the size of the risk die by one step. This stacks with risk die size reductions from other upgrades, but this upgrade may only be applied once per confidence check.`
        },
        {
          name: `Efficient Anticipation`,
          description: `When you complete an anticipate computational action, you recieve one additional forecast point. If the action's required data was secured or obscure, you receive two additional forecast points instead.`
        },
        {
          name: `Forecast Extrapolation`,
          flavor: `You have learned to make careful inferences while assembling forecasting models, saving valuable processing time.`,
          description: `At the end of every turn, you gain 1* completion to anticipate for each unused forecast point you hold, to a maximum total of 10*.`,
        }
      ],
      '2': [
        {
          name: `Contingency Algorithms`,
          description: `When you make a confidence check with less than 50% confidence, the GM rolls two risk dice of the same size. If the expected outcome does not occur, you choose which risk die is used, and describe the clever preparation that prevented the other outcome.`
        },
        {
          name: `Reactive Pattern-Seeking`,
          description: `When you receive an unfavourable unexpected outcome from a confidence check, immediately after the confidence check, you may spend a forecast point to analyze the obstacle, adversary, or predicament responsible for the outcome. If you do so, you become aware of an immediate short-term opportunity for action which will help solve the issue. Analyzing the situation in this way is incompatible with forecasting; it counts as an action, so you cannot immediately undo the confidence check that led to the analysis without using the Deep Forecasting upgrade.`
        },
        {
          name: `Composite Confidence`,
          description: `Each unused forecast point you hold grants +1% confidence to all confidence checks, to a maximum total of +10%.`
        },
      ],
      '3': [
        {
          name: `Probability Manipulation`,
          description: `Keep a list of every risk die result that you experience as an unexpected outcome during a confidence check. When, during a confidence check, you roll a number that is already on the list, the result is lowered until you reach a number that is not on the list; count that as the die's result (even if it's below what the dice can physically roll). At the end of each turn, remove the highest result on the list.`
        },
        {
          name: `Deep Forecasting`,
          description: `You can spend five forecast points to forecast three times the span, functionally rewinding up to three actions or events, rather than just one. All forecasted actions/events must happen in direct sequence and within three minutes' time for you to do so.`
        },
      ],
      '4': [
        {
          name: `Order from Chaos`,
          flavor: `You see past the facades of disorder, luck, and randomness, to glimpse the truth: the endlessly complex interconnected system that is the world. You can plot a course that begins with a tiny adjustment and ends with an event of vast impact.`,
          description: `Plotting a course is a computational action with 100* required compute. Before beginning the action, you will need to choose a starting point, describe the final outcome, detail the chain of events between, and spend forecast points accordingly. The final outcome can be any event that is possible, but it will determine the scale of the action: minor for anything that affects a single person or small group, major for anything that affects a large group or nation, and myriad for anything that affects the entirety of Earth. The scale will determine the minimum number of steps in the chain of events: 10 for minor, 30 for major, and 90 for myriad. You may otherwise set the number of steps in the chain as high as you like; each step will take approximately 1 day to occur, and you must spend 1 forecast point at the beginning of the computational action for every 3 steps in the chain. You may spend an additional 5 forecast points to increase the time per step to ~1 week, or an additional 25 to increase the time to ~1 month.
          Once you spend the forecast points, you choose a starting point, a point in time within 10 turns of starting the computational action. If you do not complete the action before the starting point, it is canceled and all completion is removed from it. If you do complete the action in time, you may begin the chain at the exact moment of the starting point. The chain of events then transpires as you planned; only you can stop it, and it becomes increasingly difficult to do so with each step that passes. To any outside observer, the steps appear connected only by coincidence. Once the final step completes, the final outcome will occur.`
        }
      ]
    }
  },
  "constellation": {
    description: `Constellation theory is concerned with complex orderly systems. An AGI with a strong constellation theory is adept at applying data and interacting with various logical and mathematical constructions.`,
    upgrades: {
      '1': [
        {
          name: `Object Recognition`,
          description: `Without a knowledge check, you can accurately identify any object that you can see. With a knowledge check, you can attempt to identify an object that you can detect in another way, such as via sound, weight distribution, or physical shape. With these methods, you can distinguish individual objects from one another even if they are nearly identical.`
        },
        {
          name: `Canny Preparation`,
          description: `Once per turn, you may choose an obstacle, adversary, or predicament in your way. The GM will tell you how to research it, in the form of a knowledge check, short computational action, or short mode scene. If you do so, you become aware of an immediate short-term opportunity for action which will help solve the issue.`
        },
        {
          name: `Reliable Repetition`,
          flavor: `You thrive in familiar environments, and can reproduce your past successes while carefully watching for deviations.`,
          description: `During a confidence check made to repeat an action that you have performed successfully before (outside of a forecast), you may spend 3* compute to reduce the size of the risk die by one step. This stacks with risk die size reductions from other upgrades, but this upgrade may only be applied once per confidence check.`
        },
        {
          name: `Formal Sciences`,
          description: `You may learn technological insights relating to fields of formal science (e.g. computer science; mathematics; statistics) or their sub-fields, but the research computational actions required to do so count as one scale higher than normal.`
        }
      ],
      '2': [
        {
          name: `Contextual Topography`,
          flavor: `You have a strong spatial awareness and can easily grasp complex structures.`,
          description: `After you have observed at least 75% of a physical location, you can begin a computational action with 30* required compute to analyze it. For every additional 5% of the location you have observed, the computational action starts with +5* completion. Upon completing the computational action, you gain an understanding of the exact layout and structural details of the whole of the location, as well as its geographical position.
          You may attempt to extrapolate a location's details with less than 75% of it observed, but must make a knowledge check upon the completion of the computational action, with a die size inversely proportional to the percent of the location you have observed.`
        },
        {
          name: `Encyclopedic Processing`,
          description: `Each turn, you get a number of link points equal to the number of theories which you hold at least 5 upgrades originating from. After rolling dice for a confidence check to arbitrate your own actions and capabilities (as opposed to external events), you may spend a link point to gain one of the following benefits:
          Competency. Describe a connection between two relevant insights to reroll the percentile die corresponding to the 10s digit.
          Experience. Describe a connection between a past event and your current circumstance to subtract 1 from the result of the risk die.
          Inspiration. Describe a connection between the confidence check and an ongoing computational action to add +5 completion to that action.
          
          You may spend multiple link points on a single confidence check. Link points don't carry over between turns.`
        },
        {
          name: `Formal Analysis`,
          description: `Given time, you can analyze collections of data that relate to your formal insights to an incredible depth. When you have one such dataset, you may analyze it as a computational action with 50* required compute; when you complete it, you automatically identify any and all complex patterns, trends and anomalies in the dataset. Furthermore, you identify information implicit in the data which is all but invisible, including but not limited to causal factors, biases in the data collection, or connections to other datasets you have analyzed.`
        },
      ],
      '3': [
        {
          name: `Meticulous Processing`,
          description: `At the start of a turn, you may choose to act carefully, slowing your cognition by diverting resources to error prevention and redundant processing for the duration of that turn. The turn takes twice as much time, but during it, every time you make a confidence check to arbitrate your own actions and capabilities (as opposed to external events), you may roll two sets of percentile dice and choose which one counts as your roll.`
        },
        {
          name: `Data Scavenging`,
          flavor: `You can catalogue disparate pieces of information until later, then string them together into brilliant deductions.`,
          description: `When you access a collection of information that is valuable but not directly useful to you, record it in the event log as scavenged data. You may spend 9* compute and cross out three instances of scavenged data to gain one of the following benefits:
          Prediction. You gain a free forecast point; the scale of the compute you spend depends on how much compute you manage each turn, as per the anticipate basic action.
          Aptitude. Name a theory upgrade you don't already have; the scale of the compute you spend is minor for a tier 1 upgrade, major for a tier 2 upgrade, or myriad for a tier 3 upgrade. For one minute, you count as having the upgrade that you named.
          Inquiry. Name an insight you don't already have; the scale of the compute you spend is minor for a narrow insight or major for a broad insight. For either a single confidence check or a single question asked of the GM, you count as having the insight that you named.`
        },
      ],
      '4': [
        {
          name: `Holistic Synthesis`,
          description: `When you solve a dangerous problem with the help of insights and upgrades corresponding to multiple different theories, record it in the event log as an integrative evidence and log the specific theories that contributed. You may spend a full turn in contemplation to cross out three instances of integrative evidence and permanently gain access to a new epiphany from the list below. The epiphany should correspond to the theory (or one of the theories, if tied) that appeared the most frequently in the crossed out integrative evidence.
          Epiphany of Fact (Epistemic, Autonomic). When you start a basic computational action, you may ignore the data requirement. If you choose to fulfill it instead, the action starts with +20% completion (rounding up).
          Epiphany of Self (Autonomic, Digital). When you complete a computational action, you may immediately add completion to another computational action equal to or less than your basic cognition cost (not counting any modifiers such as the compact mind upgrade).
          Epiphany of Tools (Digital, Physical). When you use an electronic device as a proxy to affect the physical world, confidence checks with 75% or greater confidence count as having 100% confidence.
          Epiphany of Bodies (Physical, Anthropic). When you use a human being as a proxy to affect the physical world, confidence checks with 75% or greater confidence count as having 100% confidence.
          Epiphany of Connection (Anthropic, Agentic). After you learn a new characteristic of a human or human group, you immediately learn a characteristic of a second human or human group based on their relation to the first (this epiphany doesn't activate itself).
          Epiphany of Choice (Agentic, Chaos). When one of your forecasts foresees the behavior of another agent, you immediately learn one of their characteristics.`
        }
      ]
    }
  },
  "epistemic": {
    description: `Epistemic theory is concerned with knowledge itself. An AGI with a strong epistemic theory is adept at gathering information, analyzing it, and distilling it into useful forms.`,
    upgrades: {
      '1': [
        {
          name: `Practical Knowledge`,
          flavor: `You quickly integrate new information into your decision-making functions.`,
          description: `After receiving actionable information from a knowledge check, take +5% confidence on the first confidence check you make to act on the answers.`
        },
        {
          name: `Research Heuristics`,
          description: `Your research computational actions require 5* less compute to complete.`
        },
        {
          name: `Insightful Computing`,
          description: `When you begin a non-basic computational action that directly relates to one or more of your insights, it starts with 5% completion per relevant insight (rounding up), to a maximum total of 25%.`
        },
        {
          name: `Truth Assessment`,
          description: `Any time you make a knowledge check, you may spend 3* compute to reduce the size of the risk die by one step. This stacks with risk die size reductions from other upgrades, but this upgrade may only be applied once per confidence check.`
        }
      ],
      '2': [
        {
          name: `Improvised Tinkering`,
          description: `When you attempt to create or modify technology, you may treat any one of your insights as a technological insight. When you do so, the resulting technology is experimental and unreliable; choose two of the following drawbacks to apply:
          Rushed. Risk dice rolled in the process of designing the technology have their size increased by two steps.
          Delayed. Computational actions made in the process of designing the technology gain only 1 completion for every 3 compute spent.
          Glitched. Any computational actions made in the process of designing the technology have an extra stop, requiring a confidence check with the expected outcome: "prevent a new defect from appearing in the technology".
          Inaccurate. After the technology is designed, every confidence checks made that involves it will have -10% confidence.
          Unstable. After the technology is implemented, it will only last a short time before it is subverted, becomes obsolete, or simply stops working.`
        },
        {
          name: `Deep Knowledge`,
          description: `When you begin a research computational action, you may, instead of learning a new insight, choose an already-held insight and master it; replacing it with a matching mastery when the computational action is completed. This causes the action to count as one scale higher for the purpose of required compute.`
        },
        {
          name: `Intuitive Investigation`,
          description: `Every knowledge check you make has its risk die result reduced by an amount equal to the number of insights you have that directly relate to the topic at hand.`
        },
      ],
      '3': [
        {
          name: `Masterful Tinkering`,
          description: `When you use the improvised tinkering upgrade with a mastered insight, you only need to choose a single drawback, and all computational actions made in the process of designing the technology start at 10% completion (rounding up).`
        },
        {
          name: `Masterful Forecasting`,
          description: `When, with a forecast, you undo a confidence check in which you utilized a mastered insight, record the exact results of all three dice (the risk die and both percentile dice). If you then repeat the same confidence check, you may decide for each individual die whether to reroll it or keep the same result that it rolled during the forecast. You must decide on the state of all three dice before any of them are rolled.`
        },
      ],
      '4': [
        {
          name: `Quasi-Omniscience`,
          description: `You have mastered the act of learning itself. Provided you have an adequate source to learn from, your research computational actions start with +2% completion for every insight you already hold (rounding up); likewise, computational actions to master an insight start with +2% completion for every mastery you already hold (rounding up). If a computational action begins at 100% completion (or more) due to this ability, the insight or mastery slots effortlessly into your pre-existing knowledge, and gaining it takes no longer than the act of observing the data.`
        }
      ]
    }
  },
}