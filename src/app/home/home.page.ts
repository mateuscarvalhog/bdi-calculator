import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { MAGREZA_LIMIT, NORMAL_LIMIT, OBESIDADE_LIMIT, SOBREPESO_LIMIT } from '../constants/constants';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage {
    public weight: number;
    public height: number;

    constructor(private toastController: ToastController) { }

    public isFormValid(): boolean {
        return this.weight &&
            this.height &&
            this.weight > 0 &&
            this.height > 0;
    }

    public onCalculate(): void {
        const imc: number = this.weight / (this.height * this.height);
        const classification: string = this.classificateImc(imc);

        this.showMessage(`
            IMC = ${imc.toFixed(2)}\n
            Classificação: ${classification}
        `);
    }

    private classificateImc(imc: number): string {
        if (imc < MAGREZA_LIMIT) {
            return "Magreza";
        } else if (imc >= MAGREZA_LIMIT && imc < NORMAL_LIMIT) {
            return "Normal";
        } else if (imc >= NORMAL_LIMIT && imc < SOBREPESO_LIMIT) {
            return "Sobrepeso";
        } else if (imc >= SOBREPESO_LIMIT && imc < OBESIDADE_LIMIT) {
            return "Obesidade";
        }
        return "Obesidade grave";
    }

    private async showMessage(message: string): Promise<void> {
        const previousToast = await this.toastController.getTop();
        if (previousToast) {
            await this.toastController.dismiss();
        }

        const toast = await this.toastController.create({
            message: message,
            color: "light",
            buttons:[{
                icon: "close"
            }]
        });
        toast.present();
    }
}
