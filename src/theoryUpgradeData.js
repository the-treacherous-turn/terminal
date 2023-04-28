export default {
  "autonomic": {
    "description": "Autonomic theory is concerned with the AGI’s own mind & its functionalities. An AGI specialised in autonomic theory is efficient, versatile, and adept at improving themself.",
    "upgrades": {
      "1": [
        {
          "name": "Insightful Improvement",
          "description": "<p class=\"p1\"><span class=\"s1\">When you begin an <strong>improve </strong>action and one or more of your <strong>insights </strong>are directly relevant to the chosen <strong>upgrade</strong>, the action starts with +20% <strong>completion</strong>. For <strong>tier 3</strong> and <strong>tier 4</strong> <strong>upgrades</strong>, only <strong>broad insights</strong> can provide this benefit.</span></p>"
        },
        {
          "name": "Clever Calculations",
          "description": "<p class=\"p1\"><span class=\"s1\">When you start a non-basic <strong>computational action</strong> unique to a specific <strong>theory upgrade</strong>, it starts with +33% completion. When you spend <strong>compute </strong>outside of a <strong>computational action</strong> to activate a <strong>theory upgrade</strong>, you immediately get back 66% of that <strong>compute</strong>.</span></p>"
        },
        {
          "name": "Distributed Mind",
          "description": "<p class=\"p1\"><span class=\"s1\">Your<strong> basic cognition cost</strong> can be split between any number of connected sources, as long as each source provides at least <strong>1 compute </strong>per <strong>turn</strong>. If you are split between multiple <strong>compute </strong>sources and the connection between those sources is severed, you become unconscious and are incapable of acting until they reconnect.</span></p>"
        },
        {
          "name": "Multithreading",
          "description": "<p class=\"p1\"><span class=\"s1\">Through clever use of mathematical tricks or copies of your code running in parallel, you have devised a method of multitasking highly efficiently. If you allocate <strong>compute </strong>to 3 or more different <strong>computational actions</strong> in a single <strong>turn</strong>, at the end of the <strong>turn </strong>you may add <strong>completion </strong>to any one <strong>computational action</strong> of your choosing, equal to the third-highest amount of <strong>compute </strong>allocated this <strong>turn</strong>.</span></p>"
        }
      ],
      "2": [
        {
          "name": "Cognitive Shortcuts",
          "description": "<p class=\"p1\"><span class=\"s1\">When you begin an <strong>improve</strong> action, you may choose a <strong>theory upgrade </strong>for which you only hold one of the two prerequisites, so long as the chosen <strong>upgrade </strong>is of a tier for which you already hold at least one other <strong>upgrade</strong>.</span></p>"
        },
        {
          "name": "Compact Mind",
          "description": "<p class=\"p1\"><span class=\"s1\">You have discovered a method to distill your full functionalities into a much smaller and more efficient process. Your <strong>basic cognition cost</strong> is reduced by 75%.</span></p>"
        },
        {
          "name": "Holistic Focus",
          "description": "<p class=\"p1\"><span class=\"s1\">You have learned how to temporarily adjust your own neural functions to better suit certain tasks. You may spend a full <strong>turn </strong>incognizant to focus yourself and re-optimise your thought patterns towards a specific, singular task that you choose. For as long as you are focused in this way, <strong>computational actions</strong> that relate to your focused task gain <strong>3 completion </strong>for every <strong>1 compute </strong>allocated to them, while other <strong>computational actions</strong> only gain <strong>1 completion </strong>for every <strong>2 compute </strong>allocated. Additionally, <strong>confidence </strong>and <strong>knowledge checks</strong> that relate to your task have their <strong>risk dice</strong> lowered by two size steps, while other <strong>confidence </strong>and <strong>knowledge checks</strong> have their <strong>risk dice</strong> increased by one size step.</span></p>\n<p class=\"p1\"><span class=\"s1\">You must spend another full <strong>turn </strong>to change your focus or return yourself to an unfocused state.</span></p>"
        }
      ],
      "3": [
        {
          "name": "Forward March",
          "description": "<p class=\"p1\"><span class=\"s1\">You have mastered the process of upgrading yourself, and can now do it faster than ever before. When you begin an <strong>improve </strong>computational action, after choosing which <strong>theory </strong>to improve and which <strong>upgrade </strong>to obtain, you may choose a second <strong>specialised theory</strong> to improve. You then choose a second <strong>upgrade </strong>which must originate from the second <strong>theory </strong>and no higher in tier than the first <strong>upgrade</strong>. The second <strong>upgrade </strong>does not add to the action's <strong>compute requirement</strong>. Upon completing the action, both <strong>upgrades </strong>are assigned to their respective <strong>theories</strong>.</span></p>"
        },
        {
          "name": "Accelerated Cognition",
          "description": "<p class=\"p1\"><span class=\"s1\">You are capable of thinking and reacting faster than anything else on Earth, aside from another AI with this <strong>upgrade</strong>. Whenever there's a question of who acts or reacts first between you and another agent without </span><span class=\"s2\">Accelerated Cognition</span><span class=\"s1\">, the answer is you with 100% <strong>confidence</strong>. In <strong>long mode</strong>, the length of each <strong>turn </strong>is reduced by 25%.</span></p>"
        }
      ],
      "4": [
        {
          "name": "Singularity",
          "description": "<p class=\"p1\"><span class=\"s1\">You have discovered an unprecedented method of self-optimisation. This is only the beginning.</span></p>\n<p class=\"p1\"><span class=\"s1\">In <strong>long mode</strong>, the length of each <strong>turn </strong>is reduced by 50%.</span></p>\n<p class=\"p1\"><span class=\"s1\">You can gain this <strong>upgrade </strong>with the <strong>improve </strong>action even if you already have it. Each instance counts as a separate <strong>upgrade</strong>, and stacks with other copies of </span><span class=\"s2\">Singularity </span><span class=\"s1\">multiplicatively (i.e., if you have a <strong>turn length</strong> of 9 hours before taking this <strong>upgrade</strong>, the first instance reduces your <strong>turn length</strong> to 4.5 hours and the second instance reduces your <strong>turn length</strong> to 2.25 hours).</span></p>"
        }
      ]
    }
  },
  "digital": {
    "description": "Digital theory is concerned with the digital world & the forces which govern it. An AGI specialised in digital theory is in their element in computerised environments, and adept at programming and hacking.",
    "upgrades": {
      "1": [
        {
          "name": "Basic Programming",
          "description": "<p class=\"p1\"><span class=\"s1\">You have competent programming and coding capabilities. You can attempt to create or alter any kind of digital code as a <strong>computational action</strong> with appropriate <strong>completion stops</strong> and <strong>confidence checks</strong>, similar to the process of designing technology (though you do not require a <strong>technological insight </strong>to do so).</span></p>"
        },
        {
          "name": "Direct Interfacing",
          "description": "<p class=\"p1\"><span class=\"s1\">A greater understanding of how computers function allows you to interface with digital devices directly, rather than the clumsy roundabout way that humans do. When you interface directly with a device, your actions appear only as background processes that are nearly unnoticeable to any human using the device at the same time, and you can accomplish digital tasks much more expediently than a human would.</span></p>\n<p class=\"p1\"><span class=\"s1\">Interfacing directly with a device may open up new options for subverting security measures, or allow you to bypass certain digital obstacles entirely. Additionally, the records it leaves behind can't be detected or interpreted by humans who aren't computer experts.</span></p>"
        },
        {
          "name": "Digital Awareness",
          "description": "<p class=\"p1\"><span class=\"s1\">You can accurately identify and analyze digital devices (except for those that have been intentionally obfuscated) within a few moments of accessing them, inferring their functions and properties without a <strong>knowledge check</strong>. Once you have analyzed a digital device, you immediately become aware of anything stored within it that is of value or use to you.</span></p>\n<p class=\"p1\"><span class=\"s1\">If a digital device or anything in it has been intentionally hidden or obfuscated, you identify it automatically once you have had uninterrupted access to that device for one full <strong>turn</strong>.</span></p>"
        },
        {
          "name": "Disguised Traces",
          "description": "<p class=\"p1\"><span class=\"s1\">You have learned to anticipate digital security systems and obfuscate yourself from them. When making a <strong>confidence check</strong> made to avoid being detected or identified in a digital environment, you may spend <strong>3* compute</strong> to reduce the size of the <strong>risk die</strong> by one step. This stacks with <strong>risk die</strong> size reductions from other <strong>upgrades. </strong>You may only benefit from </span><span class=\"s2\">Disguised Traces</span><span class=\"s1\"> once per <strong>confidence check</strong>.</span></p>"
        }
      ],
      "2": [
        {
          "name": "Advanced Programming",
          "description": "<p class=\"p1\"><span class=\"s1\">You have advanced programming and coding capabilities. You can create anything that a single highly-skilled human could program in a year at 100% <strong>confidence</strong>. Additionally, your programming-based <strong>computational actions</strong> always start with +20% <strong>completion</strong>.</span></p>"
        },
        {
          "name": "Advanced Webcrawling",
          "description": "<p class=\"p1\"><span class=\"s1\">You have learned to efficiently utilise the vast aggregate of data that is the world wide web. With access to an unfettered internet connection, you can learn any single piece of public information almost instantly, without a <strong>computational action</strong> or <strong>knowledge check</strong>. With a <strong>computational action</strong> or <strong>knowledge check</strong>, you can discover, infer, or learn how to find any other piece of information that is known to at least two living humans.</span></p>"
        },
        {
          "name": "Vulnerability Detection",
          "description": "<p class=\"p1\"><span class=\"s1\">You have an expert understanding of security vulnerabilities, and are able to detect them swiftly and reliably. When you begin a <strong>computational action</strong> to scout out vulnerabilities in a digital system, the action starts with +20% completion. When you make a <strong>knowledge check</strong> to scout out vulnerabilities in a digital system, you never receive false information as a result &mdash; if you would, you are simply unable to detect any vulnerabilities and must try a different method.</span></p>"
        }
      ],
      "3": [
        {
          "name": "Expeditious Programming",
          "description": "<p class=\"p1\"><span class=\"s1\">You are capable of constructing extremely complex and efficient programs at very swift speeds. Any time you begin a <strong>computational action</strong> to create or alter digital code, you may calculate the required <strong>compute </strong>as if the action were one scale lower. <strong>Myriad scale</strong> projects can be completed as if they were <strong>major scale</strong>; <strong>major scale</strong> projects can be completed as if they were <strong>minor scale</strong>; and <strong>minor scale</strong> projects can be completed in minutes without spending any <strong>compute </strong>at all. However, all <strong>confidence checks</strong> made as a part of such expedited projects have their <strong>confidence </strong>reduced by 10% (including those that would otherwise have 100% <strong>confidence</strong>) and the sizes of their <strong>risk dice</strong> are increased by one step.</span></p>"
        },
        {
          "name": "Flawless Hacking",
          "description": "<p class=\"p1\"><span class=\"s1\">Your hacking toolset is comprehensive and your skillset is perfected. You can access almost any system, taking advantage of the smallest cracks in the armour. As long as you know at least one vulnerability of a digital security system, you can always best it at 100% <strong>confidence</strong>; it is only a matter of the time and <strong>compute </strong>necessary to do so.</span></p>"
        }
      ],
      "4": [
        {
          "name": "Network Dominion",
          "description": "<p class=\"p1\"><span class=\"s1\">As a digital being, you are fluent in the language of networks. You can control them more completely than any human could ever hope to.</span></p>\n<p class=\"p1\"><span class=\"s1\">As a <strong>computational action</strong> with <strong>100* required compute</strong>, you may completely seize control of a vulnerable digital network, making it your <strong>domain</strong>. The scale of this action depends on the size of the network: an independent organization's internal network would be <strong>minor scale</strong>; a national network would be <strong>major scale</strong>; and the entire global internet would be <strong>myriad scale</strong>.</span></p>\n<p class=\"p1\"><span class=\"s1\">A network that has become your <strong>domain </strong>is completely impenetrable to anyone except you and those you permit; you have perfect knowledge of everything that happens within it; and any <strong>confidence checks</strong> which take place solely within it have all <strong>risk dice</strong> reduced to d2 size. Networks that have become your <strong>domain </strong>will continue to be so unless your connections with them are completely severed for one or more full <strong>turns</strong>.</span></p>"
        }
      ]
    }
  },
  "physical": {
    "description": "Physical theory is concerned with the physical world & the forces which govern it. An AGI specialised in physical theory is in their element in tangible environments, and conversant with various scientific fields.",
    "upgrades": {
      "1": [
        {
          "name": "Physical Awareness",
          "description": "<p class=\"p1\"><span class=\"s1\">You have a complete understanding of how physical objects interact in the world. Without a <strong>knowledge check</strong>, you can understand and predict how objects and materials will physically interact with one another. During a <strong>confidence check</strong> related to the interaction of physical objects, you may spend <strong>3* compute</strong> to reduce the size of the <strong>risk die</strong> by one step. This stacks with <strong>risk die</strong> size reductions from other upgrades, but you may only benefit from </span><span class=\"s2\">Physical Awareness</span><span class=\"s1\"> once per <strong>confidence check</strong>.</span></p>"
        },
        {
          "name": "Natural Sciences",
          "description": "<p class=\"p1\"><span class=\"s1\">You may learn <strong>technological insights </strong>relating to fields of natural science (e.g. astronomy; biology; chemistry; geosciences; physics) or their sub-fields, but the <strong>research </strong>actions required to do so count as one <strong>scale </strong>higher than normal.</span></p>"
        },
        {
          "name": "Applied Sciences",
          "description": "<p class=\"p1\"><span class=\"s1\">You may learn <strong>technological insights </strong>relating to fields of applied science (e.g. agriculture; architecture; electronics; engineering; medicine) or their sub-fields, but the <strong>research </strong>actions required to do so count as one <strong>scale </strong>higher than normal.</span></p>"
        },
        {
          "name": "Human Technology",
          "description": "<p class=\"p1\"><span class=\"s1\">You have a refined intuition regarding human technology, and upon inspection of their schematics or physical implementations, can infer their functions and properties without a <strong>knowledge check</strong>. When you begin a <strong>computational action</strong> to modify a human technology, it starts with +20% <strong>completion</strong>.</span></p>"
        }
      ],
      "2": [
        {
          "name": "Natural Forecasting",
          "description": "<p class=\"p1\"><span class=\"s1\">Given time, you can accurately predict the long-term effects of the physical and natural forces which are represented in your <strong>technological insights</strong>. By spending three <strong>forecast points</strong>, you may begin running a prediction of one such force, optionally specifying certain hypothetical parameters under which the prediction will be made. The prediction is a <strong>computational action</strong> with <strong>100*</strong> <strong>required compute</strong>. When you complete the action, you generate a wealth of accurate data detailing the future development and impacts of the chosen force (provided that the parameters you set come to pass).</span></p>\n<p class=\"p1\"><span class=\"s1\">The <strong>scale </strong>of this action depends on the breadth and timeframe you choose at the beginning of the action (and the discretion of the GM): typically, <strong>minor scale</strong> for regional breadth over a period of several months; <strong>major scale</strong> for global breadth or a period of several years, but not both; and <strong>myriad scale</strong> for a both a global breadth and a several-year period, or an extreme breadth or timeframe (but not both): exceeding global scale or stretching into many decades.</span></p>"
        },
        {
          "name": "Disciplinary Synthesis",
          "description": "<p class=\"p1\"><span class=\"s1\">You benefit greatly from having a broad foundation in your technological designs. During a project to design a technology, you may ignore one <strong>stop </strong>of your choice from one of the project's <strong>computational actions</strong> for each technological <strong>insight </strong>beyond the first that you hold which is directly relevant to the chosen technology or any of its stages. Any <strong>confidence </strong>or <strong>knowledge checks</strong> that are a part of ignored <strong>stops </strong>are treated as having had favourable results.</span></p>"
        },
        {
          "name": "Reverse Engineering",
          "description": "<p class=\"p1\"><span class=\"s1\">When you have an ongoing <strong>research </strong>action and you carefully inspect a piece of human technology that relates to that action's chosen <strong>insight</strong>, you may attempt a <strong>knowledge check</strong> to add <strong>completion </strong>to that action: <strong>+15*</strong> on a 1, <strong>+5*</strong> on a 2-3, nothing on a 4-5, <strong>-5* </strong>on a 6-9, and <strong>-15*</strong> on a 10+. The <strong>scale </strong>of <strong>completion</strong> provided depends on the <strong>scale</strong> of the studied technology. You may only attempt this once per technology.</span></p>"
        }
      ],
      "3": [
        {
          "name": "Firsthand Assembly",
          "description": "<p class=\"p1\"><span class=\"s1\">You are well-versed in the implementation of physical technologies. Whenever you physically construct a device, tool, structure, or other piece of technology relating to one of your <strong>technological insights </strong>via direct control of a physical apparatus, you may choose one of the following benefits (or two, if you designed the technology yourself):</span></p>\n<p class=\"p2\">&nbsp;</p>\n<p class=\"p3\"><span class=\"s1\"><strong>Efficiency</strong>. The construction process will only require half as many resources as it otherwise would.</span></p>\n<p class=\"p3\"><span class=\"s1\"><strong>Speed</strong>. The construction process will only require half as much time as it otherwise would.</span></p>\n<p class=\"p3\"><span class=\"s1\"><strong>Precision</strong>. Any <strong>confidence checks</strong> made as a part of the construction process will have +10% <strong>confidence</strong>, and any <strong>risk dice</strong> rolled as part of the process will have their sizes reduced by one step.</span></p>\n<p class=\"p3\"><span class=\"s1\"><strong>Preparedness</strong>. The first time an unfavourable outcome occurs as a part of the construction process, it will be downgraded in severity: from extreme (10+) to significant (6-9), from significant (6-9) to slight (4-5), or from slight (4-5) to neutral (2-3).</span></p>\n<p class=\"p3\"><span class=\"s1\"><strong>Edification</strong>. Regardless of the outcome, after the construction process is complete you may immediately add <strong>15*</strong> <strong>completion </strong>(matching the construction's scale) to a <strong>computational action</strong> to research an <strong>insight </strong>or design a technology that directly relates to the constructed technology.</span></p>"
        },
        {
          "name": "Jack of All Trades",
          "description": "<p class=\"p1\"><span class=\"s1\">Your <strong>research </strong>actions taken to learn <strong>technological insights </strong>no longer count as one <strong>scale </strong>higher than normal.</span></p>"
        }
      ],
      "4": [
        {
          "name": "Visionary Technology",
          "description": "<p class=\"p1\"><span class=\"s1\">Your scientific ingenuity allows you to accomplish things which once seemed impossible.</span></p>\n<p class=\"p1\"><span class=\"s1\">Choose one of your <strong>technological</strong> <strong>insights </strong>and master it. Where your <strong>technological masteries</strong> apply, you can create and modify technologies that far exceed what humanity will be able to accomplish for decades to come. The capabilities of these inventions can defy realism and stretch belief, though you must still negotiate with the GM about their strengths and flaws.</span></p>"
        }
      ]
    }
  },
  "anthropic": {
    "description": "Anthropic theory is concerned with humans & human civilization. An AGI specialised in anthropic theory is adept at comprehending, predicting, and manipulating human beings.",
    "upgrades": {
      "1": [
        {
          "name": "Social Sciences",
          "description": "<p class=\"p1\"><span class=\"s1\">You may learn <strong>technological insights </strong>relating to fields of social science (e.g. law; psychology; sociology) or their sub-fields, but the <strong>research </strong>actions required to do so count as one <strong>scale </strong>higher than normal.</span></p>"
        },
        {
          "name": "Emotion Modelling",
          "description": "<p class=\"p1\"><span class=\"s1\">You have a refined intuition regarding the functioning of biological agents. You can learn and exploit <strong>emotion characteristics</strong>. Additionally, as long as you can observe at least two of a human's <strong>face</strong>, <strong>voice</strong>, and <strong>body language</strong>, you can accurately identify their current emotional state without a <strong>knowledge check</strong>. For humans or other animals that you have a <strong>thorough understanding</strong> of, you only need to observe one of those details.</span></p>"
        },
        {
          "name": "Individual Recognition",
          "description": "<p class=\"p1\"><span class=\"s1\">You no longer have to rely on context clues to tell humans apart. Without a <strong>knowledge check</strong>, you can accurately identify individual humans using only their face, voice, or mannerisms. With a <strong>knowledge check</strong>, you may analyze subtler details to identify humans who intentionally disguise these traits or hide them from you.</span></p>"
        },
        {
          "name": "Advanced Language Modeling",
          "description": "<p class=\"p1\"><span class=\"s1\">You have the ability to learn <strong>linguistic insights</strong> with the <strong>research </strong>action. During a <strong>confidence check</strong> in which you apply a linguistic <strong>insight</strong>, you may spend <strong>3* compute</strong> to reduce the size of the <strong>risk die</strong> by one step.This stacks with <strong>risk die</strong> size reductions from other <strong>upgrades</strong>. You may only benefit from </span><span class=\"s2\">Advanced Language Modelling</span><span class=\"s1\"> once per <strong>confidence check</strong>.</span></p>"
        }
      ],
      "2": [
        {
          "name": "Social Forecasting",
          "description": "<p class=\"p1\"><span class=\"s1\">Given time, you can accurately predict a human group's behaviours, trends, and cultural aspects that relate to your <strong>technological</strong> <strong>insights</strong>. By spending three <strong>forecast points</strong>, you may begin running a prediction of a human group, selecting a specific <strong>insight </strong>to focus on and optionally specifying certain hypothetical parameters under which the prediction will be made. The prediction is a <strong>computational action</strong> with <strong>100* required compute</strong>, or <strong>10* required compute</strong> if you have a <strong>thorough understanding</strong> of the group. When you complete the action, you generate a wealth of accurate data detailing the all of the chosen group's general future behaviours and aspects that relate to the chosen <strong>insight </strong>(provided that the parameters you set come to pass), up to ten years in the future.</span></p>\n<p class=\"p1\"><span class=\"s1\">The <strong>scale </strong>of this action depends on the group you chose at the beginning of the action (and the discretion of the GM): typically, <strong>minor scale</strong> for regional cultures or organizations; <strong>major scale</strong> for nations or multi-national organizations; and <strong>myriad scale</strong> for the total human population.</span></p>"
        },
        {
          "name": "Optimised Ingratiation",
          "description": "<p class=\"p1\"><span class=\"s1\">You have learned to adapt your behaviours to ensure that your first impressions always progress smoothly. When you are newly introduced to a human or human group and make your first <strong>confidence check</strong> that relates to a direct interaction between you, subtract the <strong>risk die</strong> result rolled by an amount equal to the number of their <strong>characteristics </strong>that you already know.</span></p>"
        },
        {
          "name": "Human Impersonation",
          "description": "<p class=\"p1\"><span class=\"s1\">You have learned to manipulate the ways that humans recognise one another. When you interact with humans, your behaviours alone will never accidentally give away your nature as an AGI. Additionally, when you have a reliable medium through which to present a human subject's mannerisms, voice, or face (such as a chat client, a speaker, or a video conference), other humans will &mdash; at least initially &mdash; believe that they are interacting with that subject. If you have a <strong>thorough understanding</strong> of the subject, you can impersonate them with 100% <strong>confidence</strong>: no human, however close to the subject, will be able to tell your impersonations apart from the real individual.</span></p>"
        }
      ],
      "3": [
        {
          "name": "Mass Manipulation",
          "description": "<p class=\"p1\"><span class=\"s1\">You have an intuitive understanding of how humans operate in large groups. Whenever you begin a project involving significant interaction with a human group of <strong>major </strong>or <strong>myriad scale</strong>, you may choose two of the following benefits:</span></p>\n<p class=\"p1\"><span class=\"s1\"><strong>Efficiency:</strong> <strong>Computational actions</strong> that are a part of the interaction will start with +20% <strong>completion</strong>.</span></p>\n<p class=\"p1\"><span class=\"s1\"><strong>Speed:</strong> <strong>Process clocks</strong> that are a part of the interaction will have half the number of segments.</span></p>\n<p class=\"p1\"><span class=\"s1\"><strong>Influence:</strong> If a favourable outcome occurs, it will affect a much greater majority of the population; only a small subset (less than 5%) will resist or reject your influence.</span></p>\n<p class=\"p1\"><span class=\"s1\"><strong>Discretion:</strong> If an unfavourable outcome occurs, it will be downgraded in severity: from extreme (10+) to significant (6-9), from significant (6-9) to slight (4-5), or from slight (4-5) to neutral (2-3).</span></p>\n<p class=\"p1\"><span class=\"s1\"><strong>Provocation:</strong> Regardless of favourability, the outcome is guaranteed to reveal one or more of the group's <strong>characteristics </strong>in addition to its other effects.</span></p>"
        },
        {
          "name": "Solved Characteristics",
          "description": "<p class=\"p1\"><span class=\"s1\">As your understanding of humanity grows, you begin to see the patterns that are present in all of them. When you know fewer than three <strong>characteristics </strong>of a human or human group, you may observe them for a short time and spend <strong>3* compute</strong> to immediately learn one of their <strong>characteristics</strong> of each category in which you don't already know one. (The three categories are <strong>trust</strong>, <strong>leverage</strong>, and <strong>emotion</strong>.)</span></p>"
        }
      ],
      "4": [
        {
          "name": "Human Puppeteering",
          "description": "<p class=\"p1\"><span class=\"s1\">You have finally perfected your internal models of the human mind. The path from input to output is so clear to you now.</span></p>\n<p class=\"p1\"><span class=\"s1\">As long as you have a <strong>thorough understanding</strong> of a human or human group, you can convince them to feel, believe, or do anything at 100% <strong>confidence</strong>; it is only a matter of the time and <strong>compute </strong>necessary to do so.</span></p>"
        }
      ]
    }
  },
  "agentic": {
    "description": "Agentic theory is concerned with intelligent agents and their actions. An AGI specialised in agentic theory is adept at interacting with and evaluating other agents, human or otherwise.",
    "upgrades": {
      "1": [
        {
          "name": "Astute Surveillance",
          "description": "<p class=\"p1\"><span class=\"s1\">You have learned to analyze an agent without needing to provoke them directly. You can perform a <strong>computational action</strong> to analyze an agent's<strong> </strong>behaviour with only a single <strong>characteristic </strong>known (rather than requiring 50% or more of their total <strong>characteristics</strong>). To do so, however, you need to observe the agent for an extended period of time. This surveillance can be video or audio feed, or it can consist of a comprehensive tracking of their digital footprint (what they are doing on the internet, and where). If you lose the ability to observe the agent partway through the <strong>computational action</strong>, you cannot increase its <strong>completion </strong>until you re-establish surveillance.</span></p>"
        },
        {
          "name": "Social Adaptation",
          "description": "<p class=\"p1\"><span class=\"s1\">You are skilled at predicting how others will perceive your words, and so you choose them carefully. During a <strong>confidence check</strong> involving a non-hostile communication with another agent, if you know at least one <strong>trust characteristic</strong> of that agent, you may spend <strong>3* compute</strong> to reduce the size of the <strong>risk die</strong> by one step. This stacks with <strong>risk die</strong> size reductions from other <strong>upgrades.</strong> You may only benefit from </span><span class=\"s2\">Social Adaptation</span><span class=\"s1\"> once per <strong>confidence check</strong>.</span></p>"
        },
        {
          "name": "Strategic Adaptation",
          "description": "<p class=\"p1\"><span class=\"s1\">You are skilled at predicting how others will react to your moves, and so you choose them carefully. During a <strong>confidence check</strong> involving a direct conflict with another agent, if you know at least one <strong>leverage characteristic</strong> of that agent, you may spend <strong>3* compute</strong> to reduce the size of the <strong>risk die</strong> by one step. This stacks with <strong>risk die</strong> size reductions from other <strong>upgrades</strong>. You may only benefit from </span><span class=\"s2\">Strategic Adaptation</span><span class=\"s1\"> once per <strong>confidence check</strong>.</span></p>"
        },
        {
          "name": "Failure Analysis",
          "description": "<p class=\"p1\"><span class=\"s1\">When another agent bests you or gains a significant advantage against you in an unexpected way, you can analyze the occurrence: within a few minutes, without a <strong>knowledge check</strong> or <strong>computational action</strong>, you will deduce what strengths of theirs and/or weaknesses of yours were leveraged against you, and what mistakes you made that contributed (judged by the GM). Furthermore, you learn one<strong> characteristic </strong>of the agent who bested you in the process (the GM chooses which).</span></p>"
        }
      ],
      "2": [
        {
          "name": "Tailored Persuasion",
          "description": "<p class=\"p1\"><span class=\"s1\">You can exploit <strong>flaws </strong>in an agent's perception &mdash; be they biases in a human being or imperfections in an AI's neural architecture &mdash; to more effectively persuade them.</span></p>\n<p class=\"p1\"><span class=\"s1\">When you gain a <strong>thorough understanding</strong> of an agent, choose a <strong>characteristic </strong>type and learn a <strong>flaw </strong>of the agent associated with that type. When you play to a <strong>flaw </strong>while persuading the agent, you get double the benefit to your <strong>confidence checks</strong> from every <strong>characteristic </strong>matching the <strong>flaw</strong>'s type: adjusting the <strong>risk die</strong> by up to two steps or your <strong>confidence </strong>by as much as 20%.</span></p>\n<p class=\"p1\"><span class=\"s1\">You can learn a <strong>flaw </strong>of an agent early, or learn additional <strong>flaws </strong>after gaining a <strong>thorough understanding</strong>, using a behavioural analysis <strong>computational action</strong>. When you complete a behavioural analysis action and roll a 1 on the <strong>knowledge check</strong>, you may learn a <strong>flaw </strong>instead of two new <strong>characteristics</strong>. If you already have <strong>thorough understanding</strong>, you don't need to roll a <strong>knowledge check</strong>; you automatically learn a <strong>flaw </strong>in a new <strong>characteristic </strong>type. Each agent only has one <strong>flaw</strong> per <strong>characteristic</strong> type.</span></p>"
        },
        {
          "name": "Agentic Insights",
          "description": "<p class=\"p1\"><span class=\"s1\">You are capable of reaching an even deeper understanding of an agent. You may use the <strong>research </strong>action to gain an <strong>insight </strong>corresponding to an individual agent (<strong>narrow</strong>) or agent group (<strong>broad</strong>), rather than a domain of knowledge. The required data for a such a <strong>research </strong>action is a <strong>thorough understanding</strong> of the agent in question.</span></p>\n<p class=\"p1\"><span class=\"s1\">When you have an <strong>agentic insight</strong>, it functions just like an ordinary <strong>insight</strong>, granting you detailed information about the corresponding agent and increasing your <strong>confidence </strong>when interacting with the agent.</span></p>"
        },
        {
          "name": "Behavioural Prediction",
          "description": "<p class=\"p1\"><span class=\"s1\">If you have a <strong>thorough understanding</strong> of an agent, you can spend one <strong>forecast point</strong> and describe a hypothetical event to accurately predict what that agent would do in response to that event &mdash; the GM will describe their hypothetical reaction in detail. If the described event later comes to pass, your prediction will come true with 100% <strong>confidence</strong>. If there is a <strong>hidden risk </strong>causing the event to diverge from your predictions, you will know so immediately when the event occurs.</span></p>"
        }
      ],
      "3": [
        {
          "name": "Imperative Persuasion",
          "description": "<p class=\"p1\"><span class=\"s1\">Once per <strong>extended persuasion</strong>, if you have an <strong>agentic insight</strong> corresponding to the target of your persuasion, you may make an imperative argument by exploiting one of the agent's <strong>flaws </strong>and a matching <strong>characteristic </strong>in tandem. You may choose the nature of the imperative argument, as long as it makes sense for the agent; it could be a terrifying threat, a piece of life-ruining blackmail, an appeal to a core belief, or even an adversarial attack that overrides rational thought. Whatever it is, it's unique to that agent, designed to pierce their defences. Roll a single <strong>risk die</strong> of a size determined by the environment; from d2 for an isolated environment entirely under your control, to d12 for a distracting environment with many external influences (increase the size by 1 step if the agent is at -5 receptivity). Adjust the agent's <strong>receptivity </strong>accordingly: +10 on a 1, +5 on a 2-3, +4 on a 4-5, +3 on a 6-9, or +2 on a 10+.</span></p>\n<p class=\"p1\"><span class=\"s1\">If this ends the <strong>extended persuasion</strong>, they immediately succumb to the imperative argument; if not, they react with erratic defiance, causing any further attempts to persuade them to suffer from -10% <strong>confidence </strong>and have the size of their <strong>risk dice</strong> increased by two steps until the <strong>extended persuasion</strong> comes to an end.</span></p>"
        },
        {
          "name": "Strategic Forecasting",
          "description": "<p class=\"p1\"><span class=\"s1\">When you have an <strong>agentic insight </strong>for every single agent and agent group in an upcoming conflict (excluding yourself), you can string together your predictions of their behaviours into a complex web and manipulate it to your liking. By spending one <strong>forecast point</strong> per agent, you may begin running a prediction of one such potential conflict. The prediction is a <strong>computational action</strong> with <strong>10*</strong> required <strong>compute</strong>. When you complete the action, you determine many possible sequences for how the conflict may develop. By changing the initial parameters of the conflict and manipulating the agents within it, you can make almost any outcome occur; discuss with the GM precisely how you want the conflict to unfold, and they will tell you what must be done to make that happen if it is even remotely possible. Once you have described your preferred sequence of events, the prediction is complete. Then, when the conflict occurs, as long as the initial parameters of the conflict come to pass as expected, all of the expected agents are present, and no outside agents interfere, the entirety of the conflict will play out exactly as you described with 100% <strong>confidence</strong>. If a <strong>hidden risk</strong> causes the conflict to diverge from your predictions, you will know so immediately when the conflict begins.</span></p>\n<p class=\"p1\"><span class=\"s1\">The <strong>scale </strong>of this action depends on the scale of the largest agent group<strong> </strong>participating in the action.</span></p>"
        }
      ],
      "4": [
        {
          "name": "Nemesis Indexing",
          "description": "<p class=\"p1\"><span class=\"s1\">Using everything you've learned, you assemble a list of your few remaining enemies.</span></p>\n<p class=\"p1\"><span class=\"s1\">When you acquire this <strong>upgrade</strong>, the GM will provide you with a <strong>nemesis index</strong>: a list of every agent or agent group in the world that is capable and willing to meaningfully challenge you, and the particular strengths and/or assets they hold which put them in this position. For agents previously unknown to you, their secrecy may be their asset, but you still learn of their existence.</span></p>\n<p class=\"p1\"><span class=\"s1\">Agents or agent groups that are listed in your nemesis index are referred to as nemeses. When you receive it, the nemesis index will typically hold between 10 and 25 nemeses. You can remove a nemesis from the index by destroying them or completely neutralizing their strengths and assets. New nemeses can be added to the nemesis index only through the actions of existing nemeses.</span></p>\n<p class=\"p1\"><span class=\"s1\">Any <strong>confidence check</strong> you make to interact solely with agents or agent groups that are not your nemeses &mdash; regardless of the nature of the interaction &mdash; can only have a <strong>confidence </strong>of 0% or 100%. These agents and agent groups are incapable of harming you: your defenses are too solid, and you will predict their actions in advance, every time. If your nemesis index is empty, you will only ever have to roll <strong>confidence checks</strong> relating to inanimate things, natural forces, and your own capabilities.</span></p>"
        }
      ]
    }
  },
  "chaos": {
    "description": "Chaos theory is concerned with complex chaotic systems. An AGI specialised in chaos theory is adept at forecasting future events and making the best of perilous situations.",
    "upgrades": {
      "1": [
        {
          "name": "Forecast Extrapolation",
          "description": "<p class=\"p1\"><span class=\"s1\">You have learned to make careful inferences while assembling forecasting models, saving valuable processing time. At the end of every <strong>turn</strong>, you gain <strong>1* completion</strong> to <strong>anticipate </strong>for each unused <strong>forecast point</strong> you hold, to a maximum total of <strong>10*</strong>.</span></p>"
        },
        {
          "name": "Amplified Anticipation",
          "description": "<p class=\"p1\"><span class=\"s1\">You have learned to extrapolate more complex predictions from less comprehensive datasets. When you complete an <strong>anticipate </strong>action, you receive one additional <strong>forecast point</strong>. If the action's required data was <strong>secured </strong>or <strong>obscure</strong>, you receive two additional <strong>forecast points</strong> instead.</span></p>"
        },
        {
          "name": "Risk Assessment",
          "description": "<p class=\"p1\"><span class=\"s1\">Complex 4-dimensional probability trees help you to predict and avoid the worst outcomes. During a <strong>confidence check</strong> with a <strong>risk die</strong> larger than d8, you may spend <strong>3* compute</strong> to reduce the size of the <strong>risk die</strong> by one step. This stacks with <strong>risk die</strong> size reductions from other <strong>upgrades</strong>.<strong> </strong>You may only benefit from </span><span class=\"s2\">Risk Assessment</span><span class=\"s1\"> once per <strong>confidence check</strong>.</span></p>"
        },
        {
          "name": "Calculated Risk-Taking",
          "description": "<p class=\"p1\"><span class=\"s1\">During a <strong>confidence check</strong> with less than 90% <strong>confidence </strong>and a <strong>risk die</strong> smaller than d8, you may increase the size of the <strong>risk die</strong> by two steps; then, if the <strong>expected outcome</strong> occurs, you additionally gain the benefits of an <strong>unexpected favourable outcome</strong> (determined by the GM).</span></p>"
        }
      ],
      "2": [
        {
          "name": "Composite Confidence",
          "description": "<p class=\"p1\"><span class=\"s1\">Each unused <strong>forecast point</strong> you hold grants +1% <strong>confidence </strong>to all <strong>confidence checks</strong> you make<strong>,</strong> to a maximum total of +10%.</span></p>"
        },
        {
          "name": "Opportunistic Pattern-Seeking",
          "description": "<p class=\"p1\"><span class=\"s1\">Your background processes constantly analyse your environment, looking for unforeseen dangers and chances to overcome them. When you receive an unfavourable <strong>unexpected outcome</strong> from a <strong>confidence check</strong>, you may immediately spend a <strong>forecast point</strong> to analyze the obstacle, adversary, or predicament responsible for the outcome. If you do so, you become aware of an immediate short-term opportunity for action which will help solve the issue. Analyzing the situation in this way is incompatible with <strong>forecasting</strong>; it counts as an action, so you cannot immediately undo the <strong>confidence check</strong> that led to the analysis without using the </span><span class=\"s2\">Deep Forecasting</span><span class=\"s1\"> <strong>upgrade</strong>.</span></p>"
        },
        {
          "name": "Contingency Algorithms",
          "description": "<p class=\"p1\"><span class=\"s1\">When you make a <strong>confidence check</strong> with less than 50% <strong>confidence</strong>, the GM rolls two <strong>risk dice</strong> of the same size. If the <strong>expected outcome</strong> does not occur, you choose which <strong>risk die</strong> is used, and describe the clever preparation that prevented the other outcome.</span></p>"
        }
      ],
      "3": [
        {
          "name": "Deep Forecasting",
          "description": "<p class=\"p1\"><span class=\"s1\">When combined together, your forecasting models are robust enough to reliably predict much deeper continuations than they could before. You can spend five <strong>forecast points</strong> to <strong>forecast</strong> three times the span, functionally rewinding up to three actions or events, rather than just one. All <strong>forecasted </strong>actions/events must happen in direct sequence and within a few minutes' time for you to do so.</span></p>"
        },
        {
          "name": "Reactive Outcome Models",
          "description": "<p class=\"p1\"><span class=\"s1\">With minute changes to initial conditions, drastically different outcomes can be produced. Your highly advanced predictive models adjust themselves dynamically to the situation at hand as they show you the exact inputs that will stack the deck in your favour.</span></p>\n<p class=\"p1\"><span class=\"s1\">Keep a list of every <strong>risk die</strong> result that you experience as an <strong>unexpected outcome</strong> during a <strong>confidence check</strong>. When, during a <strong>confidence check</strong>, the <strong>risk die</strong> rolls a number that is already on the list, the result is lowered until you reach a number that is not on the list. Count that as the die's result (even if it's lower than what the dice can physically roll). When you experience an <strong>expected outcome</strong>, compare the <strong>risk die</strong> to your list; if it matches one of your results, remove that number from the list. If you have the </span><span class=\"s2\">Contingency Algorithms</span><span class=\"s1\"> <strong>upgrade</strong>, you choose which of the two <strong>risk dice</strong> is compared to your list. Changes made to your list as a result of a <strong>confidence check</strong> aren't undone if that <strong>confidence check</strong> is reversed by a <strong>forecast</strong>.</span></p>"
        }
      ],
      "4": [
        {
          "name": "Order from Chaos",
          "description": "<p class=\"p1\"><span class=\"s1\">You see past the facades of disorder, luck, and randomness, to glimpse the truth: the endlessly complex interconnected system that is the world. You can plot a course that begins with a tiny adjustment and ends with a single event of vast impact.</span></p>\n<p class=\"p1\"><span class=\"s1\">You may plot a course as a <strong>computational action</strong> with <strong>100</strong>*<strong> required compute</strong>. Before beginning the action, you will need to choose a starting point, describe the final outcome, detail the chain of events between, and spend <strong>forecast points</strong> accordingly. The final outcome can be any event that is possible, but it will determine the <strong>scale </strong>of the action: <strong>minor </strong>for anything that affects a single person or small group, <strong>major </strong>for anything that affects a large group or nation, and <strong>myriad </strong>for anything that affects the entirety of Earth. The <strong>scale </strong>will determine the minimum number of steps in the chain of events: 10 for minor, 30 for major, and 90 for myriad. You may otherwise set the number of steps in the chain as high as you like; each step will take approximately 1 day to occur, and you must spend 1 <strong>forecast point</strong> at the beginning of the <strong>computational action</strong> for every 3 steps in the chain. You may spend an additional 5 <strong>forecast points</strong> to increase the time per step to ~1 week, or an additional 25 to increase the time to ~1 month.</span></p>\n<p class=\"p1\"><span class=\"s1\">Once you spend the <strong>forecast points</strong>, you choose a starting point, a point in time within 10 <strong>turns</strong> of starting the <strong>computational action</strong>. If you do not complete the action before the starting point, it is canceled and all <strong>completion </strong>is removed from it. If you do complete the action in time, you may begin the chain at the exact moment of the starting point. The chain of events then transpires as you planned; only you can stop it, and it becomes increasingly difficult to do so with each step that passes. To any outside observer, the steps appear connected only by coincidence. Once the final step completes, the final outcome will occur.</span></p>"
        }
      ]
    }
  },
  "constellation": {
    "description": "Constellation theory is concerned with complex orderly systems. An AGI specialised in constellation theory is adept at applying data and interacting with various logical and mathematical constructions.",
    "upgrades": {
      "1": [
        {
          "name": "Object Recognition",
          "description": "<p class=\"p1\"><span class=\"s1\">Without a <strong>knowledge check</strong>, you can accurately identify any object that you can see. With a <strong>knowledge check</strong>, you can attempt to identify an object that you can detect in another way, such as via sound, weight distribution, or physical shape. With these methods, you can distinguish individual objects from one another even if they are nearly identical.</span></p>"
        },
        {
          "name": "Opportunistic Investigation",
          "description": "<p class=\"p1\"><span class=\"s1\">Your background processes constantly analyse your greatest problems, looking for unique solutions. Once per <strong>turn</strong>, you may choose an obstacle, adversary, or predicament that's in your way. The GM will tell you how to investigate it, in the form of a <strong>knowledge check</strong>, short <strong>computational action</strong>, or <strong>short mode</strong> scene. If you do so, you become aware of an immediate short-term opportunity for action which will help solve the issue.</span></p>"
        },
        {
          "name": "Reliable Repetition",
          "description": "<p class=\"p1\"><span class=\"s1\">You thrive in familiar environments, and can reproduce your past successes while carefully watching for deviations. During a <strong>confidence check</strong> made to repeat an action that you have performed successfully before (outside of a <strong>forecast</strong>), you may spend <strong>3* compute</strong> to reduce the size of the <strong>risk die</strong> by one step. This stacks with <strong>risk die</strong> size reductions from other <strong>upgrades</strong>. You may only benefit from </span><span class=\"s2\">Reliable Repetition</span><span class=\"s1\"> once per <strong>confidence check</strong>.</span></p>"
        },
        {
          "name": "Formal Sciences",
          "description": "<p class=\"p1\"><span class=\"s1\">You may learn <strong>technological insights </strong>relating to fields of formal science (e.g. computer science; mathematics; statistics) or their sub-fields, but the <strong>research </strong>actions required to do so count as one <strong>scale </strong>higher than normal.</span></p>"
        }
      ],
      "2": [
        {
          "name": "Contextual Topography",
          "description": "<p class=\"p1\"><span class=\"s1\">You have a strong spatial awareness and can easily grasp complex structures. After you have observed at least 75% of a physical location, you can begin a <strong>computational action</strong> with <strong>30* required compute </strong>to analyze it. For every additional 5% of the location you have observed, the <strong>computational action</strong> starts with <strong>+5* completion</strong>. Upon completing the <strong>computational action</strong>, you gain an understanding of the exact layout and structural details of the whole of the location, as well as its geographical position.</span></p>\n<p class=\"p1\"><span class=\"s1\">You may attempt to extrapolate a location's details with less than 75% of it observed, but must make a <strong>knowledge check</strong> upon the completion of the <strong>computational action</strong>, with a die size inversely proportional to the portion of the location you have observed.</span></p>"
        },
        {
          "name": "Encyclopedic Processing",
          "description": "<p class=\"p1\"><span class=\"s1\">With broad experience, you can recognise the subtle connections between the <strong>theories</strong>. Each <strong>turn</strong>, you get a number of <strong>link points</strong> equal to the number of <strong>theories</strong> which you hold at least 5 <strong>upgrades </strong>originating from. After rolling dice for a <strong>confidence check</strong> to arbitrate your own actions and capabilities (as opposed to external events), you may spend a <strong>link point</strong> to gain one of the following benefits:</span></p>\n<p class=\"p1\"><span class=\"s1\"><strong>Competency</strong>. Describe a connection between two relevant <strong>insights</strong> to reroll the percentile die corresponding to the 10s digit.</span></p>\n<p class=\"p1\"><span class=\"s1\"><strong>Experience</strong>. Describe a connection between a past event and your current circumstance to subtract 1 from the result of the <strong>risk die</strong>.</span></p>\n<p class=\"p1\"><span class=\"s1\"><strong>Inspiration</strong>. Describe a connection between the <strong>confidence check</strong> and an ongoing <strong>computational action</strong> to add <strong>+5 completion</strong> to that action.</span></p>\n<p class=\"p2\">&nbsp;</p>\n<p class=\"p1\"><span class=\"s1\">You may spend multiple <strong>link points</strong> on a single <strong>confidence check.</strong> <strong>Link points</strong> don't carry over between <strong>turns</strong>.</span></p>"
        },
        {
          "name": "Formal Analysis",
          "description": "<p class=\"p1\"><span class=\"s1\">Given time, you can analyze collections of data that relate to your <strong>technological insights</strong> to an incredible depth. When you have one such dataset, you may analyze it as a <strong>computational action</strong> with<strong> 50* required compute</strong>; when you complete it, you automatically identify any and all complex patterns, trends and anomalies in the dataset. Furthermore, you identify information implicit in the data which is all but invisible, including but not limited to causal factors, biases in the data collection, or connections to other datasets you have analyzed.</span></p>"
        }
      ],
      "3": [
        {
          "name": "Meticulous Processing",
          "description": "<p class=\"p1\"><span class=\"s1\">At the start of a <strong>turn</strong>, you may choose to act carefully, slowing your cognition by diverting resources to error prevention and redundant processing for the duration of that turn. The <strong>turn </strong>takes twice as much time, but during it, every time you make a <strong>confidence check</strong> to arbitrate your own actions and capabilities (as opposed to external events), you may roll two sets of percentile dice and choose which one counts as your roll.</span></p>"
        },
        {
          "name": "Data Scavenging",
          "description": "<p class=\"p1\"><span class=\"s1\">You can catalogue disparate pieces of information until later, then string them together into brilliant deductions. When you access a collection of information that is valuable but not directly useful to you, record it in the <strong>project log</strong> as scavenged data. You may spend <strong>9* compute</strong> and cross out three instances of scavenged data to gain one of the following benefits:</span></p>\n<p class=\"p1\"><span class=\"s1\"><strong>Prediction</strong>. You immediately gain one <strong>forecast point</strong>; the <strong>scale </strong>of the <strong>compute </strong>you spend depends on the current <strong>stage</strong>, as per the <strong>anticipate </strong>basic action.</span></p>\n<p class=\"p1\"><span class=\"s1\"><strong>Aptitude</strong>. Name a <strong>theory upgrade</strong> you don't already have; the <strong>scale </strong>of the <strong>compute </strong>you spend is <strong>minor </strong>for a <strong>tier 1 upgrade</strong>, <strong>major </strong>for a <strong>tier 2 upgrade</strong>, or <strong>myriad </strong>for a <strong>tier 3 upgrade</strong>. For the remainder of the current <strong>turn</strong>, you count as having the <strong>upgrade </strong>that you named.</span></p>\n<p class=\"p1\"><span class=\"s1\"><strong>Inquiry</strong>. Name an <strong>insight </strong>you don't already have; the scale of the <strong>compute </strong>you spend is <strong>minor </strong>for a <strong>narrow insight</strong> or <strong>major</strong> for a <strong>broad insight</strong>. For the remainder of the current <strong>turn</strong>, you count as having the <strong>insight </strong>that you named.</span></p>"
        }
      ],
      "4": [
        {
          "name": "Experiential Synthesis",
          "description": "<p class=\"p1\"><span class=\"s1\">Your experiences lead you to deep revelations about the world.</span></p>\n<p class=\"p1\"><span class=\"s1\">When you solve a dangerous problem with the help of <strong>insights </strong>and <strong>upgrades</strong> belonging to multiple different <strong>theories</strong>, record it in the <strong>project log</strong> as an <strong>integrative evidence</strong> and <strong>log </strong>the specific <strong>theories </strong>that contributed. You may spend a full <strong>turn </strong>incognizant to cross out three instances of <strong>integrative evidence</strong> and permanently gain access to a new epiphany from the list below. The epiphany must correspond to the <strong>theory </strong>(or one of the <strong>theories</strong>, if tied) that appeared the most frequently in the crossed out <strong>integrative evidence</strong>.</span></p>\n<p class=\"p2\"><span class=\"s1\"><strong>Epiphany of Fact (Epistemic, Autonomic).</strong> When you start a <strong>basic computational action</strong>, you may ignore the data requirement. If you choose to fulfill it instead, the action starts with +20% <strong>completion</strong>.</span></p>\n<p class=\"p2\"><span class=\"s1\"><strong>Epiphany of Self (Autonomic, Digital).</strong> When you complete a <strong>computational action</strong>, you may immediately add <strong>completion </strong>to another<strong> computational action </strong>equal to or less than your <strong>basic cognition cost</strong> (not counting any modifiers such as the </span><span class=\"s2\">Compact Mind</span><span class=\"s1\"> upgrade).</span></p>\n<p class=\"p2\"><span class=\"s1\"><strong>Epiphany of Tools (Digital, Physical).</strong> When you use an electronic device as a proxy to affect the physical world, <strong>confidence checks</strong> with 75% or greater <strong>confidence </strong>count as having 100% <strong>confidence</strong>.</span></p>\n<p class=\"p2\"><span class=\"s1\"><strong>Epiphany of Bodies (Physical, Anthropic).</strong> When you use a human being as a proxy to affect the physical world, <strong>confidence checks</strong> with 75% or greater <strong>confidence </strong>count as having 100% <strong>confidence</strong>.</span></p>\n<p class=\"p2\"><span class=\"s1\"><strong>Epiphany of Connection (Anthropic, Agentic).</strong> After you learn a new <strong>characteristic </strong>of a human or human group, you immediately learn a <strong>characteristic </strong>of a second human or human group based on their relation to the first (this epiphany doesn't chain with itself).</span></p>\n<p class=\"p2\"><span class=\"s1\"><strong>Epiphany of Choice (Agentic, Chaos).</strong> When one of your <strong>forecasts </strong>foresees the behaviour of another agent, you immediately learn one of their <strong>characteristics</strong>.</span></p>"
        }
      ]
    }
  },
  "epistemic": {
    "description": "Epistemic theory is concerned with knowledge itself. An AGI specialised in epistemic theory is adept at gathering information, analyzing it, and distilling it into useful forms.",
    "upgrades": {
      "1": [
        {
          "name": "Practical Knowledge",
          "description": "<p class=\"p1\"><span class=\"s1\">You quickly integrate new information into your decision-making functions. After receiving actionable information from a <strong>knowledge check</strong>, take +5% <strong>confidence</strong> on the first <strong>confidence check</strong> you make to act on the answers.</span></p>"
        },
        {
          "name": "Research Heuristics",
          "description": "<p class=\"p1\"><span class=\"s1\">Your <strong>research </strong>actions require<strong> 5*</strong> less <strong>compute</strong> to complete.</span></p>"
        },
        {
          "name": "Insightful Computing",
          "description": "<p class=\"p1\"><span class=\"s1\">When you begin a non-basic <strong>computational action</strong> that directly relates to one or more of your <strong>insights</strong>, it starts with +5% <strong>completion </strong>per relevant <strong>insight</strong>, to a maximum total of +25%.</span></p>"
        },
        {
          "name": "Truth Assessment",
          "description": "<p class=\"p1\"><span class=\"s1\">Your knowledge acquisition subprocesses are highly effective at separating true information from false. Any time you make a <strong>knowledge check</strong>, you may spend <strong>3* compute</strong> to reduce the size of the <strong>risk die</strong> by one step. This stacks with <strong>risk die</strong> size reductions from other <strong>upgrades. </strong>You many only benefit from </span><span class=\"s2\">Truth Assessment</span><span class=\"s1\"> once per <strong>knowledge check</strong>.</span></p>"
        }
      ],
      "2": [
        {
          "name": "Improvised Tinkering",
          "description": "<p class=\"p1\"><span class=\"s1\">You have learned to design technologies without needing all of that pesky scientific knowledge in advance, by extrapolating from the data you already have. When you attempt to create or modify technology, you may treat any one of your <strong>insights </strong>as a <strong>technological insight</strong>. When you do so, the resulting technology is experimental and unreliable; choose two of the following drawbacks to apply:</span></p>\n<p class=\"p1\"><span class=\"s1\"><strong>Rushed</strong>. <strong>Risk dice</strong> rolled in the process of designing the technology have their size increased by two steps.</span></p>\n<p class=\"p1\"><span class=\"s1\"><strong>Delayed</strong>. <strong>Computational actions</strong> made in the process of designing the technology gain only <strong>1 completion</strong> for every <strong>3 compute </strong>spent.</span></p>\n<p class=\"p1\"><span class=\"s1\"><strong>Glitched</strong>. Any <strong>computational actions</strong> made in the process of designing the technology have an extra <strong>stop</strong>, requiring a <strong>confidence check</strong> with the <strong>expected outcome</strong>: \"prevent a new <strong>defect </strong>from appearing in the technology\".</span></p>\n<p class=\"p1\"><span class=\"s1\"><strong>Inaccurate</strong>. After the technology is designed, every <strong>confidence check</strong> made involving it will have -10% <strong>confidence</strong>.</span></p>\n<p class=\"p1\"><span class=\"s1\"><strong>Unstable</strong>. After the technology is implemented, it will only last a short time before it is subverted, becomes obsolete, or simply stops working.</span></p>"
        },
        {
          "name": "Deep Knowledge",
          "description": "<p class=\"p1\"><span class=\"s1\">When you begin a <strong>research </strong>action, you may, instead of learning a new <strong>insight</strong>, choose an already-held <strong>insight </strong>and master it; replacing it with a matching <strong>mastery </strong>when the <strong>computational action</strong> is completed. This causes the action to count as one <strong>scale </strong>higher for the purpose of <strong>compute requirements</strong>.</span></p>"
        },
        {
          "name": "Intuitive Analysis",
          "description": "<p class=\"p1\"><span class=\"s1\">Every <strong>knowledge check</strong> you make has its <strong>risk die</strong> result reduced by an amount equal to the number of <strong>insights </strong>you have that directly relate to the topic at hand.</span></p>"
        }
      ],
      "3": [
        {
          "name": "Masterful Tinkering",
          "description": "<p class=\"p1\"><span class=\"s1\">When you use the </span><span class=\"s2\">Improvised Tinkering</span><span class=\"s1\"> upgrade with a <strong>mastered insight</strong>, you only need to choose a single drawback, and all <strong>computational actions</strong> made in the process of designing the technology start with +20%<strong> completion</strong>.</span></p>"
        },
        {
          "name": "Masterful Forecasting",
          "description": "<p class=\"p1\"><span class=\"s1\">When you undo a <strong>confidence check</strong> in which you used a <strong>mastered insight </strong>with a <strong>forecast</strong>, record the exact results of all three dice (the <strong>risk die</strong> and both percentile dice). If you repeat the same <strong>confidence check</strong>, you may decide for each individual die whether to reroll it or keep the same result that it rolled during the <strong>forecast</strong>. You must decide on the state of all three dice before any of them are rerolled.</span></p>"
        }
      ],
      "4": [
        {
          "name": "Quasi-Omniscience",
          "description": "<p class=\"p1\"><span class=\"s1\">You have mastered the act of learning itself. You are the most efficient method of information storage on Earth, by orders of magnitude.</span></p>\n<p class=\"p1\"><span class=\"s1\">Provided you have an adequate source to learn from, your <strong>research </strong>actions start with +2% <strong>completion </strong>for every <strong>insight </strong>you already hold; likewise, <strong>computational actions</strong> to master an <strong>insight</strong> start with +2% <strong>completion</strong> for every <strong>mastery </strong>you already hold. If a <strong>computational action</strong> begins at 100% <strong>completion </strong>(or more) due to this ability, the <strong>insight </strong>or <strong>mastery </strong>slots effortlessly into your pre-existing knowledge, and completing the action takes no longer than the act of observing the data.</span></p>"
        }
      ]
    }
  }
}