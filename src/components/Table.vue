<template>
    <v-container>
        <v-card elevation="2">
            <v-row no-gutters>
                <v-col sm="6" md="4" lg="3" class="pa-3">
                <v-text-field
                    v-model="search"
                    append-icon="mdi-magnify"
                    :label="$t('ui.label_search')"
                    single-line
                    hide-details
                    dense
                    solo
                ></v-text-field>
                </v-col>
                <v-col class="pa-3 text-right">
                
                <v-checkbox
                    style="margin-top: 0; padding-top: 0; display: inline-block;"
                    v-model="extendedTable"
                    :label="$t('ui.extended_table')"
                    dense
                ></v-checkbox>
                
                </v-col>
            </v-row>
            <v-card-text class="m-t">
                {{ $t("ui.filters.label_uric_acid_levels") }}
                <v-chip
                    @click="setFilter('very_low')"
                    class="ma-1"
                    :color="getColor(0, 'very_low')"
                    dark
                    small
                >
                    {{ $t("ui.filters.level_very_low") }} 0&mdash;50
                </v-chip>
                <v-chip
                    @click="setFilter('low')"
                    class="ma-1"
                    :color="getColor(51, 'low')"
                    dark
                    small
                >
                    {{ $t("ui.filters.level_low") }} 50&mdash;100
                </v-chip>
                <v-chip
                    @click="setFilter('moderate')"
                    class="ma-1"
                    :color="getColor(101, 'moderate')"
                    dark
                    small
                >
                    {{ $t("ui.filters.level_moderate") }} 100&mdash;200
                </v-chip>
                <v-chip
                    @click="setFilter('high')"
                    class="ma-1"
                    :color="getColor(201, 'high')"
                    dark
                    small
                >
                    {{ $t("ui.filters.level_high") }} 200&mdash;300
                </v-chip>
                <v-chip
                    @click="setFilter('very_high')"
                    class="ma-1"
                    :color="getColor(301, 'very_high')"
                    dark
                    small
                >
                    {{ $t("ui.filters.level_very_high") }} 300+
                </v-chip>
            </v-card-text>

            <v-data-table
                :headers="headers"
                :items="filteredItems"
                :items-per-page="200"
                :search="search"
                sort-by="uricAcid"
                class="elevation-1"
            >
                <template v-slot:item.name="{ item }">
                    <b>{{
                        $te("food." + item.name)
                            ? $t("food." + item.name)
                            : item.name
                    }}</b>
                </template>
                <template v-slot:item.total="{ item }">
                    <b>{{ item.total }}</b>
                </template>
                <template v-slot:item.uricAcid="{ item }">
                    <v-chip :color="getColor(item.uricAcid)" dark>
                        <b>{{ item.uricAcid }}</b>
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
import chroma from "chroma-js";

export default {
    name: "Table",
    data: () => {
        return {
            foods: Foods,
            foodsPrepared: [],
            search: "",
            filter: null,
            extendedTable: false,
        };
    },
    created() {
        this.prepareData();
    },
    methods: {
        setFilter: function (val) {
            if (this.filter === val) {
                this.filter = null;
            } else {
                this.filter = val;
            }
        },
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
        getColor(uricAcid, filterVal) {
            let color = "";

            if (uricAcid > 300) color = "black";
            else if (uricAcid > 200) color = "#760000";
            else if (uricAcid > 100) color = "red";
            else if (uricAcid > 50) color = "orange";
            else color = "green";

            if (filterVal && this.filter && this.filter !== filterVal) {
                return chroma(color).alpha(0.2).hex();
            }

            return color;
        },
    },
    computed: {
        headers: function () {
            let headers = [
                {
                    text: this.$t("ui.table.icon"),
                    value: "icon",
                    sortable: false,
                },
                {
                    text: this.$t("ui.table.food"),
                    align: "start",
                    value: "name",
                },
                {
                    text: this.$t("ui.table.type"),
                    value: "type",
                },
            ];

            if (this.extendedTable) {
                headers = [
                    ...headers,
                    { text: this.$t("ui.table.adenine"), value: "adenine" },
                    { text: this.$t("ui.table.guanine"), value: "guanine" },
                    {
                        text: this.$t("ui.table.hypoxanthine"),
                        value: "hypoxanthine",
                    },
                    { text: this.$t("ui.table.xanthine"), value: "xanthine" },
                ];
            }

            headers = [
                ...headers,
                { text: this.$t("ui.table.total"), value: "total" },
                { text: this.$t("ui.table.uric_acid"), value: "uricAcid" },
            ];
            return headers;
        },
        filteredItems: function () {
            if (!this.filter) {
                return this.foodsPrepared;
            }

            return this.foodsPrepared.filter((item) => {
                if (this.filter === "very_low") {
                    return item.uricAcid < 50;
                } else if (this.filter === "low") {
                    return item.uricAcid >= 50 && item.uricAcid < 100;
                } else if (this.filter === "moderate") {
                    return item.uricAcid >= 100 && item.uricAcid < 200;
                } else if (this.filter === "high") {
                    return item.uricAcid >= 200 && item.uricAcid < 300;
                } else if (this.filter === "very_high") {
                    return item.uricAcid >= 300;
                }

                return false;
            });
        },
    },
    watch: {
        extendedTable(extendedTableValue) {
            localStorage.extendedTable = extendedTableValue;
        },
        filter(newFilter) {
            localStorage.filter = newFilter
        }
    },
    mounted() {
        this.extendedTable = localStorage.extendedTable === "true"
        this.filter = localStorage.filter === "null" ? null : localStorage.filter
    },
};
</script>
