<template>
    <v-container>
        <v-container>
            <p>Data sources:</p>
            <ol>
                <li v-for="source in sources" :key="source.id">
                    "{{ source.name }}" by <i>{{ source.author }}</i>
                </li>
            </ol>
        </v-container>
    </v-container>
</template>

<script>
import Sources from "../data/sources.json";

export default {
    name: "Table",
    data: () => {
        return {
            sources: Sources
        }
    }
}
</script>