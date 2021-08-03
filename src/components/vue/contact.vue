<template>
  <div
    id="contact"
    class="my-container p-4 sm:px-14 py-16 bg-blue-light text-blue"
  >
    <div class="mw w-full">
      <div class="title-comp mb-9">contact</div>
      <form
        accept-charset="UTF-8"
        v-on:submit.prevent="onSubmit()"
        method="POST"
      >
        <div class="mygrid">
          <label class="main-label">Email address<span>*</span></label>
          <input type="email" v-model="email" required="required" />
        </div>
        <div class="mygrid">
          <label class="main-label">Name<span>*</span></label>
          <input type="text" v-model="name" required="required" />
        </div>
        <div class="mygrid">
          <label class="main-label">Company Name </label>
          <input type="text" v-model="cname" />
        </div>
        <div class="mygrid">
          <div class="main-label">Areas of Interest</div>
          <div>
            <div v-for="(area, index) in skills" :key="index">
              <input
                :id="area.name"
                type="checkbox"
                :value="area.name"
                v-model="areasToSubmit"
              />
              <label :for="area">{{ area.name }}</label>
            </div>
          </div>
        </div>
        <div class="mygrid">
          <label class="main-label">Message<span>*</span></label>
          <textarea
            type="text"
            v-model="message"
            required="required"
          ></textarea>
        </div>
        <div class="border-b-2 border-blue-900" />
        <div class="mt-4 font-bold text-green-600" v-if="isSuccess">
          I received your submission, thank you!
        </div>
        <button type="submit">Send Contact</button>
      </form>
    </div>
  </div>
</template>
<script>
export default {
  name: "Contact",
  props: ["skills"],
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
    onSubmit() {
      let data = `
        Email: ${this.email}
        Name: ${this.name}
        Company Name: ${this.cname}
        Areas of Interest: ${this.areasToSubmit
          .toString()
          .replaceAll(",", ", ")}
        Message: ${this.message}`;

      this.$fire.firestore
        .collection("mail")
        .add({
          to: "info@artur-teixeira.tech",
          message: {
            subject: "Website Lead",
            text: data,
          },
        })
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
.main-label {
  @apply block w-full;
  text-transform: uppercase;
  /* Start figma here */
  font-family: Norwester;
  font-size: 24px;
  font-style: normal;
  font-weight: 400;
  line-height: 29px;
  letter-spacing: 0em;
  text-align: left;
}

.main-label > span {
  @apply text-orange;
}
</style>