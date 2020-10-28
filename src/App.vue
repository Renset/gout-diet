<template>
    <v-app>
        <v-app-bar app color="primary" dark>
            <div class="d-flex align-center">
                <h1>Gout diet table</h1>
            </div>

            <v-spacer></v-spacer>

            <v-btn
                href="https://github.com/Renset/gout-diet"
                target="_blank"
                text
            >
                <span class="mr-2">GitHub</span>
                <v-icon>mdi-open-in-new</v-icon>
            </v-btn>
        </v-app-bar>

        <v-main>
            <Introduction />
            <Table />
            <Footer />
        </v-main>
    </v-app>
</template>

<script>
import Introduction from "./components/Introduction";
import Table from "./components/Table";
import Footer from "./components/Footer";

export default {
    name: "App",

    components: {
        Introduction,
        Table,
        Footer
    },

    data: () => ({}),
};
</script>
