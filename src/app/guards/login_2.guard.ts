import { inject } from "@angular/core";
import { Router } from "@angular/router";
import { DataService } from "../data.service";

export const loginGuard_2 = () => {
    const router = inject(Router);
    const key = inject(DataService);
    if (key.LogIn_1 && key.LogIn_2) {
    return true;
    } else {
        router.navigate(['/LogIn']);
        return false;
    }
}