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
            <v-card-text class="text-right">(mg in 100g)</v-card-text>
            <v-data-table
                :headers="headers"
                :items="foodsPrepared"
                :items-per-page="50"
                :search="search"
                group-by="type"
                class="elevation-1"
            >
                <template v-slot:item.uricAcid="{ item }">
                    <v-chip :color="getColor(item.uricAcid)" dark>
                        {{ item.uricAcid }}
                    </v-chip>
                </template>
                <template v-slot:item.icon="{ item }">
                    <span style="font-size: 1.8rem">{{ item.icon }}</span>
                </template>
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
                    text: "Icon",
                    value: "icon",
                    sortable: false,
                },
                {
                    text: "Food",
                    align: "start",
                    value: "name",
                },
                {
                    text: "Type",
                    value: "type",
                },
                { text: "Adenine", value: "adenine" },
                { text: "Guanine", value: "guanine" },
                { text: "Hypoxanthine", value: "hypoxanthine" },
                { text: "Xanthine", value: "xanthine" },
                { text: "Total Purines", value: "total" },
                { text: "Uric Acid", value: "uricAcid" },
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
                foodPrepared.type = food.type;
                foodPrepared.icon = food.icon;
                this.foodsPrepared.push(foodPrepared);
            });
        },
        getColor(uricAcid) {
            if (uricAcid > 300) return "black";
            else if (uricAcid > 200) return "#760000";
            else if (uricAcid > 100) return "red";
            else if (uricAcid > 50) return "orange";
            else return "green";
        },
    },
};
</script>