import { inject } from "@angular/core";
import { Router } from "@angular/router";
import { DataService } from "../data.service";

export const loginGuard = () => {
    const router = inject(Router);
    const key = inject(DataService);
    if (key.LogIn_1) {
    return true;
    } else {
        router.navigate(['/LogIn']);
        return false;
    }
}