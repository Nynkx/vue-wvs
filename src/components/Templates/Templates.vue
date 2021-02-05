<template>
  <v-simple-table fixed-header>
    <thead>
      <tr>
        <th v-for="header in headers" :key="header">
          {{ header }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="template in templates" :key="template._id">
        <td>
          <v-skeleton-loader max-width="150" v-if="isLoading" type="text"></v-skeleton-loader>
          <router-link
            v-else
            :to="{
              path: `documents/sign/${template._id}`,
              props: true,
            }"
            >{{ template.name }}</router-link
          >
        </td>
        <td>
          <v-skeleton-loader max-width="100" v-if="isLoading" type="text"></v-skeleton-loader>
          <span v-else>{{ formatBytes(template.size) }}</span>
        </td>
        <td>
          <v-skeleton-loader max-width="200" v-if="isLoading" type="text"></v-skeleton-loader>
          <span v-else>{{ template.created }}</span>
        </td>
        <td>
          <v-skeleton-loader max-width="200" v-if="isLoading" type="text"></v-skeleton-loader>
          <span v-else>{{ template.modified }}</span>
        </td>
      </tr>
    </tbody>
  </v-simple-table>

</template>

<script>
export default {
    data: function() {
        return {
            headers: [
                'Name',
                'Size',
                'Created',
                'Modified',
            ],
            isLoading: true,
        }
    },
    mounted: async function() {
      await this.$store.dispatch('templates/getTemplate');
      this.isLoading = false;
    },
    computed: {
        templates: function() {
            return this.$store.state.templates.templates;
        }
    },
    methods: {
        test: function() {
          console.log(this.templates)
        },
        formatBytes: function(bytes, decimals = 2) {
          if (bytes === 0) return "0 Bytes";

          const k = 1024;
          const dm = decimals < 0 ? 0 : decimals;
          const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

          const i = Math.floor(Math.log(bytes) / Math.log(k));

          return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
      },
    }
}
</script>