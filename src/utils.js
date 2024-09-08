// Fonction pour filtrer les données par section
export const filterDataBySection = (data, sectionName) => {
    if (!Array.isArray(data)) {
        console.error("Les données ne sont pas un tableau valide :", data);
        return [];
    }
    return data.filter(item => item.section === sectionName);
};
