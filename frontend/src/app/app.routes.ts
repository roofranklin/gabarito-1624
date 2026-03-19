import { Routes } from "@angular/router";
import { DashboardComponent } from "./main-panel/pages/dashboard/dashboard.component";
import { TransferComponent } from "./main-panel/pages/transfer/transfer.component";
import { LoanComponent } from "./main-panel/pages/loan/loan.component";
import { NotFoundComponent } from "./main-panel/pages/not-found/not-found.component";
import { TransactionsComponent } from "./main-panel/pages/transactions/transactions.component";
import { CreateTransactionComponent } from "./main-panel/pages/transactions/components/create-transaction/create-transaction.component";
import { ProfileComponent } from "./main-panel/pages/profile/profile.component";
import { PersonalDataComponent } from "./main-panel/pages/profile/pages/personal-data/personal-data.component";
import { SecuritySettingsComponent } from "./main-panel/pages/profile/pages/security-settings/security-settings.component";
import { LoginComponent } from "./pages/login/login.component";
import { authGuard } from "./core/guards/auth.guard";
import { MainPanelComponent } from "./main-panel/main-panel.component";

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: '',
    component: MainPanelComponent,
    canActivate: [authGuard],
    children: [
      { path: "dashboard", component: DashboardComponent },
      { path: "transferencia", component: TransferComponent },
      { path: "emprestimo", component: LoanComponent },
      { path: "transacoes", component: TransactionsComponent },
      { path: "transacoes/criar", component: CreateTransactionComponent },
      { path: "transacoes/editar/:id", component: CreateTransactionComponent },
      {
        path: "perfil",
        component: ProfileComponent,
        children: [
          { path: "dados", component: PersonalDataComponent },
          { path: "seguranca", component: SecuritySettingsComponent },
          { path: "", redirectTo: "dados", pathMatch: "full" },
        ],
      },
    ]
  },
  { path: "", redirectTo: "/login", pathMatch: "full" },
  { path: "**", component: NotFoundComponent },
];
