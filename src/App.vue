<template>
    <v-app>
        <v-app-bar app dark color="green" dense elevation="0">
    
            <v-toolbar-title>{{$t('ui.title')}}</v-toolbar-title>

            <v-spacer></v-spacer>

            <v-toolbar-items>
            
                <v-select style="width: 120px; padding-top: 3px;" v-model="$i18n.locale" :items="langs" prepend-icon="mdi-translate" outlined dense>

                </v-select>
                <v-btn
                    href="https://github.com/Renset/gout-diet"
                    target="_blank"
                    text
                >
                    <span class="mr-2">GitHub</span>
                    <v-icon>mdi-open-in-new</v-icon>
                </v-btn>
            </v-toolbar-items>
            
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

    data: () => ({
        langs: ['ru', 'en']
    }),
};
</script>
