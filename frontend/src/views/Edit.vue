<template>
    <nav>
        <router-link
            class="py-3 px-4 text-center text-white bg-indigo-600 hover:bg-indigo-700 rounded-md shadow block lg:inline"
            to="/home">Home</router-link>
        <!-- <router-link class="py-3 px-4 text-center text-white bg-indigo-600 hover:bg-indigo-700 rounded-md shadow block lg:inline" to="/home">Home</router-link> -->
    </nav>

    <div class="rounded-lg
            bg-blue-900
            w-full
            items-center
            lg:w-5/12
            my-44
            mx-auto
            xl:p-10
            lg:p-8
            relative
            flex
            justify-center
            lg:flex-row
            hover:shadow-md
            border border-green-800
          ">
        <section class="
              w-full
              focus:border-green-800 focus:ring-1 focus:ring-green-800 focus
              outline-none
              text-white
              placehorder
              rounded-lg
              pl-4
              py-2
              mb-4
            ">
            <h1 class="text-3xl text-center font-bold">Editin</h1>
            <br />
            <form id="new-todo-form" @submit.prevent="">
                <input class="
                  w-full
                  focus:border-green-800 focus:ring-1 focus:ring-green-800 focus
                  outline-none
                  text-black
                  placehorder
                  rounded-lg
                  pl-4
                  py-2
                  mb-4
                " type="text" required name="content" id="content" placeholder="https/" v-model="real_link" />

                <button class="w-full bg-green-700 rounded-lg" type="submit" value="SUBMIT" @click="editHandler()">
                    Save
                </button>
            </form>
        </section>
    </div>
</template>


<script>
export default {
    data() {
        return {
            name: "EditView",
            newflink: "",
            newslink: "",
        };
    },
    async editHandler(short) {
        const res = await axios.patch(`http://localhost:8000/shorts/${short}`, {
            newflink: this.newLink.newflink,
            newslink: this.newLink.newslink,
        })
            .then((res) => {
                location.reload()
                console.log(res)
            })
    },
    editLink(id) {
        this.links.forEach((link) => {
            if (todo.id == id) {
                this.newLink.id = todo.id
                this.newLink.newflink = todo.flink
                this.newLink.newslink = todo.slink
            }
        })
        this.editbar = true;
    }
}

</script>
