

export function hasSpecSymbols(value: string, acceptableSymbols?: string): boolean {
    let unacceptableSymbols = `!@#$%^&*()_-=+|{}[]/?.>,<'\`"~ `;
    try {
        if(acceptableSymbols && typeof acceptableSymbols === 'string') {
            unacceptableSymbols = unacceptableSymbols.split('').filter((symb) => !acceptableSymbols.includes(symb)).join('');
        }
        let isHasSpecSym = false;
        value.split('').forEach((item) => {
            if (unacceptableSymbols.includes(item)) return isHasSpecSym = true;
        });
        return isHasSpecSym;
    } catch (err) {
        console.error('/src/views/LoginViews/LoginView.vue: hasSpecSymbols => ', err);
        throw err;
    }
}