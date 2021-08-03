<template>
  <div id="contact">
    <form accept-charset="UTF-8" v-on:submit.prevent="onSubmit()" method="POST">
      <div class="mygrid">
        <label class="main-label">Email address *</label>
        <input type="email" v-model="email" required="required" />
      </div>
      <div class="mygrid">
        <label class="main-label">Name *</label>
        <input type="text" v-model="name" required="required" />
      </div>
      <div class="mygrid">
        <label class="main-label">Company Name </label>
        <input type="text" v-model="cname" />
      </div>
      <div class="mygrid">
        <div class="main-label">Areas of Interest</div>
        <div>
          <div v-for="(area, index) in areas" :key="index">
            <input
              :id="area"
              type="checkbox"
              :value="area"
              v-model="areasToSubmit"
            />
            <label :for="area">{{ area }}</label>
          </div>
        </div>
      </div>
      <div class="mygrid">
        <label class="main-label">Message *</label>
        <textarea type="text" v-model="message" required="required"></textarea>
      </div>
      <div class="border-b-2 border-blue-900" />
      <div class="mt-4 font-bold text-green-600" v-if="isSuccess">
        I received your submission, thank you!
      </div>
      <button type="submit">Send Contact</button>
    </form>
  </div>
</template>
<script>
export default {
  name: 'Contact',
  data() {
    return {
      name: '',
      cname: '',
      email: '',
      areas: [
        'Web',
        'Mobile',
        'Infrastructure',
        'CI/CD',
        'Database',
        'Management',
        'IT Sec',
      ],
      areasToSubmit: [],
      message: '',
      isSuccess: false,
    }
  },
  methods: {
    onSubmit() {
      let data = `
        Email: ${this.email}
        Name: ${this.name}
        Company Name: ${this.cname}
        Areas of Interest: ${this.areasToSubmit
          .toString()
          .replaceAll(',', ', ')}
        Message: ${this.message}`

      this.$fire.firestore
        .collection('mail')
        .add({
          to: 'info@artur-teixeira.tech',
          message: {
            subject: 'Website Lead',
            text: data,
          },
        })
        .then((docRef) => {
          this.isSuccess = docRef.id ? true : false
          this.email = '';
          this.name = '';
          this.cname = '';
          this.areasToSubmit = [];
          this.message = '';
        })
        .catch((error) => {
          console.error(`Error: ${error}`)
        })
    },
  },
}
</script>