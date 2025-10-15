import React, { useMemo, useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Text, Searchbar, Button, Chip } from 'react-native-paper';
import { useShop } from '../context/ShopContext';
import { CATEGORIES } from '../data/mockProducts';
import ProductCard from '../components/ProductCard';
import FilterModal from '../components/FilterModal';

export default function HomeScreen({ navigation }) {
  const { products } = useShop();
  const [query, setQuery] = useState('');
  const [cat, setCat] = useState('All');
  const [filters, setFilters] = useState(null);
  const [open, setOpen] = useState(false);

  const data = useMemo(() => {
    let arr = products;
    if (cat !== 'All') arr = arr.filter((p) => p.category === cat);
    if (query) arr = arr.filter((p) =>
      p.name.toLowerCase().includes(query.toLowerCase())
    );
    if (filters) {
      arr = arr.filter(
        (p) =>
          (!filters.categories.length ||
            filters.categories.includes(p.category)) &&
          p.price >= filters.min &&
          p.price <= filters.max &&
          p.rating >= filters.minRating
      );
    }
    return arr;
  }, [products, query, cat, filters]);

  return (
    <ScrollView style={styles.wrap} contentContainerStyle={{ padding: 16 }}>
      <Text variant="headlineSmall" style={{ marginBottom: 8 }}>
        Discover
      </Text>

      <Searchbar
        placeholder="Search products"
        value={query}
        onChangeText={setQuery}
        style={{ marginBottom: 8 }}
      />

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ marginBottom: 8 }}
      >
        <Chip selected={cat === 'All'} onPress={() => setCat('All')} style={styles.chip}>
          All
        </Chip>
        {CATEGORIES.map((c) => (
          <Chip
            key={c}
            selected={cat === c}
            onPress={() => setCat(c)}
            style={styles.chip}
          >
            {c}
          </Chip>
        ))}
      </ScrollView>

      <Button
        mode="outlined"
        onPress={() => setOpen(true)}
        style={{ marginBottom: 12 }}
      >
        Open Filters
      </Button>

      {data.map((item) => (
        <ProductCard
          key={item.id}
          item={item}
          onPress={() =>
            navigation.navigate('ProductDetail', { product: item })
          }
        />
      ))}

      <FilterModal
        visible={open}
        onDismiss={() => setOpen(false)}
        onApply={(f) => {
          setFilters(f);
          setOpen(false);
        }}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  wrap: { flex: 1, backgroundColor: '#f5f5f5' },
  chip: { marginRight: 8 },
});
