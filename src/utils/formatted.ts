
// Форматирование строки из формата CamelCase в формат snake_case
function toSnakeCase(key: string) {
    try {
        return key.replace(/([a-z])([A-Z])/g, '$1_$2').toLowerCase();
    } catch (err) {
        console.error('/src/utils/formatted.ts: toSnakeCase => ', err);
        throw err;
    }
}

// Сборка массива/объекта форматируя ключи CamelCase -> snake_case
export function formatKeysToSnakeCase(data: any): any {
    try {
        if (Array.isArray(data)) {
            // Если data - это массив, рекурсивно форматируем каждый элемент массива
            return data.map(item => formatKeysToSnakeCase(item));
        } else if (typeof data === 'object' && data !== null) {
            // Если data - это объект, форматируем ключи и рекурсивно обрабатываем значения
            const formattedObject: any = {};
            for (const [key, value] of Object.entries(data)) {
                const snakeCaseKey = toSnakeCase(key);
                formattedObject[snakeCaseKey] = formatKeysToSnakeCase(value);
            }
            return formattedObject;
        } else {
            // Если data не объект и не массив, возвращаем его как есть
            return data;
        }
    } catch (err) {
        console.error('/src/utils/formatted.ts: formatKeysToSnakeCase => ', err);
        throw err;
    }

}

// Форматирование текста. Приведение первого символа каждого слова в верхний регистр
export function capitalizeText(text: string): string {
    try {
        return text.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '); 
    } catch (err) {
        console.error('/src/utils/formatted.ts: capitalizeText => ', err);
        throw err;
    }
}