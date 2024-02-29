// Import the functions you need from the SDKs you need
import { FirebaseApp, initializeApp } from 'firebase/app';
import {
  getFirestore,
  Firestore,
  collection,
  addDoc,
} from 'firebase/firestore';
import {
  ExpensesReport,
  Invoice,
  LedgerReport,
  LedgerTransaction,
} from '~/types';
import { Collections } from './Collections';
import { firebaseConfig } from './config';
import { InvoicesModel } from './models/InvoicesModel';
import { LedgerTransactionsModel } from './models/LedgerTransactionsModel';
import { ReportsModel } from './models/ReportsModel';
import { TripsModel } from './models/TripsModel';

export class FirebaseService {
  db: Firestore;
  app: FirebaseApp;
  reports: ReportsModel;
  ledgerTransactions: LedgerTransactionsModel;
  invoices: InvoicesModel;
  trips: TripsModel;

  constructor() {
    this.app = initializeApp(firebaseConfig);
    this.db = getFirestore(this.app);
    this.reports = new ReportsModel(this.db);
    this.ledgerTransactions = new LedgerTransactionsModel(this.db);
    this.invoices = new InvoicesModel(this.db);
    this.trips = new TripsModel(this.db);
  }

  async addReport(report: ExpensesReport) {
    await this.reports.addReport(report);
  }

  async getReports() {
    const reports = await this.reports.getReports();
    return reports;
  }

  async getReportById(id: string): Promise<ExpensesReport> {
    const report = await this.reports.getReportById(id);
    return report;
  }

  async getAllTransactionReports() {
    const reports = await this.reports.getAllTransactionReports();
    return reports;
  }

  async addLedgerTransactions(ledgerTransactions: LedgerTransaction[]) {
    this.ledgerTransactions.addLedgerTransactions(ledgerTransactions);
  }

  getLedgerTransactions() {
    return this.ledgerTransactions.getLedgerTransactions();
  }

  async createLedgerReport(ledgerReport: LedgerReport) {
    const docRef = await addDoc(
      collection(this.db, Collections.LedgerReport),
      ledgerReport
    );

    console.log('Document written with ID: ', docRef.id);
    console.log('report', docRef);
  }

  async getInvoices() {
    const invoices = await this.invoices.getInvoices();
    return invoices;
  }

  async addInvoice(invoice: Invoice) {
    await this.invoices.addInvoice(invoice);
  }
}

let firebaseService = new FirebaseService();

export default firebaseService;
