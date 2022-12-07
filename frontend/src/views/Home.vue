<template>
  <div>
      <h1 class="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Shorten Link</h1>
      <form @submit.prevent="addTask">
          <div class="form-group">
              <label class="border w-4/12" for="newTodoDescription"></label>
              <input type="text" class="form-control" ref="desc" v-model="this.description" placeholder="Write Here" required>
             
          </div>
          <br>
          <button type="submit" class="buttonCreate">Create</button>
      </form>
      <br>
</div>
<div class="todoList">
 
      <br>
      
      <br>
      <table class="table">
          <thead class="table table-dark">
              <tr>
                  <th class="description">Your Link</th>
                  <!-- <th class="tags">Kategori</th>
                  <th class="edit">Edit</th>
                  <th class="delete">Delete</th> -->
              </tr>
          </thead>
          <tbody>
              <tr v-for="(task,i) in tasks" :key="i">
                   <td class="description" v-bind:class="{completed: task.completed}" @click="toggleTask(task.id, task.completed)">
                  {{task.description}}<div><input type="checkbox" :checked="task.completed" @click="check" /></div></td>
                  <td> 
                  </td>
            <td><button class="buttonRemove" @click="deleteTask(task.id)"><i class="fa fa-trash"></i></button>
                  </td>
              </tr>
          </tbody>
      </table>    
  </div>
</template>

<script>
import { Icon } from "@iconify/vue";
import NavbarVue from "../components/Navbar.vue";
export default {
  name: "HomeView",
  components: {
    NavbarVue,
    Icon,
  },
};
</script>