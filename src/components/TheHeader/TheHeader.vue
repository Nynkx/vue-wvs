<template>
  <v-app-bar>
    <v-spacer></v-spacer>
    <v-menu offset-y>
      <template v-slot:activator="{ on, attrs }">
        <v-avatar color="lightgrey" v-bind="attrs" v-on="on">
          <v-icon>
            mdi-account-circle
          </v-icon>
          <!-- {{ fullName }} -->
        </v-avatar>
      </template>
      <v-card>
        <v-list-item-content class="justify-center">
          <div class="mx-auto text-center">
            <v-avatar>
              <!-- <span class="white--text headline">{{ user.initials }}</span> -->
              <v-icon>
                mdi-account-circle
              </v-icon>
            </v-avatar>
            <h3>{{ fullName }}</h3>
            <p class="caption mt-1">
              {{ user.username }}
            </p>
            <v-divider class="my-3"></v-divider>
          </div>
        </v-list-item-content>

        <v-list-item @click="handleLogout">
          <v-list-item-icon class="mr-2">
            <v-icon color="error">mdi-logout</v-icon>
          </v-list-item-icon>
          <v-list-item-title style="color: #f44336">Logout</v-list-item-title>
        </v-list-item>
      </v-card>
    </v-menu>
  </v-app-bar>
</template>

<script>
import { mapActions } from "vuex";
import { StorageHelper } from "@/helpers";

export default {
  name: "TheHeader",
  data: function() {
    return {
      user: {
        firstName: "Test",
        lastName: "Name",
        username: "test@mail.com",
      },
    };
  },
  computed: {
    fullName: function() {
      return (this.user.lastName + " " + this.user.firstName).trim();
    },
  },
  mounted: function() {
    let user = StorageHelper.getItem("user");
    if (user) this.user = user;
  },
  methods: {
    ...mapActions("auth", ["logout"]),

    handleLogout: function() {
      this.logout();
      this.$router.push({ name: "Login" });
    },
  },
};
</script>
