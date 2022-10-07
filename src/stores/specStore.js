export default {
  state: () => ({
    specs: {
      spec1: {
        name: "Spec 1",
        focus: "Autonomic",
        upgrades: {
          upgrade1: {
            name: "Upgrade 1",
            theory: "Autonomic",
            tier: 1,
            description: "Upgrade 1 description. Amet sunt ut culpa minim cillum minim qui velit consectetur aliquip. Dolore duis nostrud sint mollit proident tempor laborum elit sunt anim do occaecat nostrud deserunt. Elit sunt ipsum enim ex id sint elit. Officia velit reprehenderit amet ullamco.",
          },
          upgrade2: {
            name: "Upgrade 2",
            theory: "Autonomic",
            tier: 1,
            description: "Upgrade 2 description. Laboris mollit reprehenderit do reprehenderit minim magna adipisicing ipsum elit occaecat adipisicing do dolor. Pariatur Lorem labore elit voluptate ullamco officia officia. Proident ad fugiat minim culpa nostrud ad veniam pariatur laborum eu sit consequat. Laboris qui ipsum nostrud ad consequat amet excepteur labore mollit qui veniam exercitation nulla.",
          },
          upgrade3: {
            name: "Upgrade 3",
            theory: "Epistemic",
            tier: 1,
            description: "Upgrade 3 description. Eu eiusmod nulla cillum sunt velit aliquip in labore est do. Non velit ex tempor mollit laborum et fugiat ex eu enim cupidatat dolor sint eiusmod. Sint veniam irure dolore cillum Lorem deserunt elit minim dolore amet. Voluptate esse deserunt adipisicing tempor sint est cillum sunt sit aute nisi esse id consectetur. Dolor velit sunt labore consequat irure magna est tempor adipisicing aliqua. Ipsum anim nulla incididunt exercitation in eiusmod velit deserunt enim mollit fugiat reprehenderit sunt. Ullamco qui qui incididunt dolore.",
          },
        },
        insights: {
          insight1: {
            name: "Insight 1",
            range: "narrow",
            type: "technological"
          },
          insight2: {
            name: "Insight 2",
            range: "broad",
            type: "standard"
          },
          insight3: {
            name: "Insight 3",
            range: "narrow",
            type: "linguistic"
          },
        }
      },
      spec2: {
        name: "Spec 2",
        focus: "Epistemic",
        upgrades: {
          upgrade1: {
            name: "Upgrade 1",
            theory: "Epistemic",
            tier: 1,
            description: "Upgrade 1 description",
          },
          upgrade3: {
            name: "Upgrade 2",
            theory: "Epistemic",
            tier: 1,
            description: "Upgrade 3 description",
          },
        },
        insights: {
          insight1: {
            name: "Insight 1",
            range: "narrow",
            type: "technological"
          },
          insight2: {
            name: "Insight 2",
            range: "broad",
            type: "standard"
          },
          insight3: {
            name: "Insight 3",
            range: "narrow",
            type: "linguistic"
          },
          insight4: {
            name: "Insight 4",
            range: "broad",
            type: "standard"
          },
        }
      },
    },
    activeSpecID: null,
  }),
  getters: {
    activeSpec(state) {
      return state.specs[state.activeSpecID]
    }
  },
  mutations: {
    setActiveSpecID(state, specID) {
      state.activeSpecID = specID;
    },
    clearActiveSpecID(state) {
      state.activeSpecID = null;
    },
  }
}