const slugify = (name) => name.toLowerCase().trim().replace(/\s+/g, '-');
const deleteDocumentWithSubcollections = async (docRef) => {
  const collections = await docRef.listCollections();

  await Promise.all(
    collections.map(async (collection) => {
      const snapshot = await collection.get();
      await Promise.all(snapshot.docs.map((doc) => doc.ref.delete()));
    })
  );

  await docRef.delete();
};
export { slugify, deleteDocumentWithSubcollections };
