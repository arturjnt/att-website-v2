<template>
  <div
    id="contact"
    class="my-container p-4 sm:px-14 py-16 text-blue bg-blue-light"
  >
    <div class="mw w-full">
      <div class="title-comp mb-4">{{ vuet("CONTACT.TITLE") }}</div>
      <form
        class="flex flex-col"
        accept-charset="UTF-8"
        v-on:submit.prevent="onSubmit()"
        method="POST"
      >
        <div class="mygrid">
          <label class="main-label" for="email"
            >{{ vuet("CONTACT.EMAIL") }}<span>*</span></label
          >
          <input id="email" type="email" v-model="email" required="required" />
        </div>
        <div class="mygrid">
          <label class="main-label" for="name"
            >{{ vuet("CONTACT.NAME") }}<span>*</span></label
          >
          <input id="name" type="text" v-model="name" required="required" />
        </div>
        <div class="mygrid">
          <label class="main-label" for="company_name"
            >{{ vuet("CONTACT.COMPANY_NAME") }}
          </label>
          <input id="company_name" type="text" v-model="cname" />
        </div>
        <div class="mygrid">
          <div class="main-label">{{ vuet("CONTACT.AREAS_OF_INTEREST") }}</div>
          <div class="sm:ml-2 sm:col-span-2">
            <div v-for="(area, index) in skills" :key="index">
              <label class="checkbox check-label" :for="area.name">
                <span class="checkbox__input">
                  <input
                    :id="area.name"
                    type="checkbox"
                    :value="area.name"
                    v-model="areasToSubmit"
                  />
                  <span class="checkbox__control">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                      focusable="false"
                    >
                      <path
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2.5"
                        d="M 2 13 l 6.37 6.37 L 22 6"
                      />
                    </svg>
                  </span>
                </span>
                <span class="check-label ml-5">{{ area.name }}</span>
              </label>
            </div>
          </div>
        </div>
        <div class="mygrid">
          <label class="main-label" for="message"
            >{{ vuet("CONTACT.MESSAGE") }}<span>*</span></label
          >
          <textarea
            id="message"
            type="text"
            v-model="message"
            required="required"
          ></textarea>
        </div>
        <div class="m-4 text-center text-orange-dark" v-show="isSuccess">
          {{ vuet("CONTACT.SUCCESS") }}
        </div>
        <button class="button-send" type="submit">
          {{ vuet("CONTACT.SEND") }}
        </button>
      </form>
    </div>
  </div>
</template>
<script>
export default {
  name: "Contact",
  props: ["skills", "t"],
  data() {
    return {
      name: "",
      cname: "",
      email: "",
      areasToSubmit: [],
      message: "",
      isSuccess: false,
    };
  },
  methods: {
    vuet(CODE) {
      return this.t(CODE);
    },
    onSubmit() {
      let data = `
        Email: ${this.email}
        Name: ${this.name}
        Company Name: ${this.cname}
        Areas of Interest: ${this.areasToSubmit
          .toString()
          .replaceAll(",", ", ")}
        Message: ${this.message}`;

      // use xml http request
      fetch(
        "https://us-central1-att-website-dc55b.cloudfunctions.net/addEmail",
        {
          method: "POST",
          headers: { "Content-Type": "text/plain" },
          body: data,
        }
      )
        .then((response) => response.json())
        .then((docRef) => {
          this.isSuccess = docRef.id ? true : false;
          this.email = "";
          this.name = "";
          this.cname = "";
          this.areasToSubmit = [];
          this.message = "";
        })
        .catch((error) => {
          console.error(`Error: ${error}`);
        });
    },
  },
};
</script>
<style>
.checkbox {
  display: grid;
  grid-gap: 2rem;
  line-height: 1;
  grid-template-columns: min-content auto;
  grid-gap: 0.5em;
  font-size: 2rem;
  color: theme("colors.blue.DEFAULT");
  margin-bottom: 1em;
}

.checkbox__control {
  display: inline-grid;
  width: 1.875em;
  height: 1.875em;
  border-radius: 0.188em;
  border: 0.125em solid currentColor;
  opacity: 0.6;
}

.checkbox__control svg {
  transform: scale(0);
  transform-origin: bottom left;
}

.checkbox__input {
  display: grid;
  grid-template-areas: "checkbox";
}
.checkbox__input > * {
  grid-area: checkbox;
}

.checkbox__input input {
  opacity: 0;
  width: 1.875em;
  height: 1.875em;
}

.checkbox__input input:checked + .checkbox__control svg {
  transform: scale(1);
}

.mygrid {
  @apply my-5 sm:grid sm:grid-cols-4 sm:mb-6;
}

.main-label {
  @apply mb-5 w-full sm:text-right sm:pr-6 sm:mb-0;
  text-transform: uppercase;
  /* Start figma here */
  font-family: Norwester;
  font-size: 24px;
  font-style: normal;
  font-weight: 400;
  line-height: 29px;
  letter-spacing: 0em;
}

.main-label > span {
  @apply text-orange;
}

input[type="email"],
input[type="text"] {
  @apply sm:col-span-2;
  background-color: theme("colors.blue.fields");
  border-bottom-color: theme("colors.grey.DEFAULT");
  border-bottom-width: 1px;
  width: 100%;
}

input[type="checkbox"] {
  transform: scale(2);
}

.check-label {
  font-family: Hind;
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: 29px;
  letter-spacing: 0em;
  text-align: left;
}

textarea {
  @apply sm:col-span-3;
  height: 140px;
  width: 100%;
  border: 1px solid theme("colors.grey.DEFAULT");
  background-color: theme("colors.blue.fields");
  box-sizing: border-box;
  border-radius: 4px;
}

.button-send {
  @apply bg-orange;

  font-family: Norwester;
  font-style: normal;
  font-weight: normal;
  font-size: 28px;
  line-height: 34px;

  text-transform: capitalize;

  color: #ffffff;
  border-radius: 100px;
  padding: 10px 70px;

  align-self: center;
}
</style>