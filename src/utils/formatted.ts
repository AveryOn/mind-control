
// Форматирование строки из формата CamelCase в формат snake_case
function toSnakeCase(key: string) {
    return key.replace(/([a-z])([A-Z])/g, '$1_$2').toLowerCase();
}

// Сборка массива/объекта форматируя ключи CamelCase -> snake_case
export function formatKeysToSnakeCase(data: any): any {
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
}