import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';

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
        this.showMessage(`IMC = ${imc.toFixed(2)}`);
    }

    public async showMessage(message: string): Promise<void> {
        const previousToast = await this.toastController.getTop();
        if (previousToast) {
            await this.toastController.dismiss();
        }

        const toast = await this.toastController.create({
            message: message,
            buttons:[{
                icon: "close"
            }]
        });
        toast.present();
    }
}
