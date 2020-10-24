<template>
    <v-container>
        <v-card>
            <v-card-title>
                <v-text-field
                    v-model="search"
                    append-icon="mdi-magnify"
                    label="Search"
                    single-line
                    hide-details
                ></v-text-field>
            </v-card-title>
            <v-data-table
                :headers="headers"
                :items="foodsPrepared"
                :items-per-page="50"
                :search="search"
                class="elevation-1"
            >
            </v-data-table>
        </v-card>
    </v-container>
</template>

<script>
import Foods from "../data/foods.json";

export default {
    name: "Table",
    data: () => {
        return {
            foods: Foods,
            foodsPrepared: [],
            search: "",
            headers: [
                {
                    text: "Food",
                    align: "start",
                    sortable: false,
                    value: "name",
                },
                { text: "Adenine", value: "adenine" },
                { text: "Guanine", value: "guanine" },
                { text: "Hypoxanthine", value: "hypoxanthine" },
                { text: "Xanthine", value: "xanthine" },
                { text: "Total", value: "total" },
                { text: "UricAcid", value: "uricAcid" },
            ],
        };
    },
    mounted() {
        this.prepareData();
    },
    methods: {
        prepareData: function () {
            this.foods.forEach((food) => {
                let foodPrepared = {};
                foodPrepared.name = food.name;
                foodPrepared.adenine = food.purines[0].adenine;
                foodPrepared.guanine = food.purines[0].guanine;
                foodPrepared.hypoxanthine = food.purines[0].hypoxanthine;
                foodPrepared.xanthine = food.purines[0].xanthine;
                foodPrepared.total = food.purines[0].total;
                foodPrepared.uricAcid = food.purines[0].uricAcid;
                this.foodsPrepared.push(foodPrepared);
            });
        },
    },
};
</script>