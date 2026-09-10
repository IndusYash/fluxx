export interface ImpactArea {
  title: string;
  description: string;
  icon: React.ReactNode;
  keyBenefits: string[];
}

export interface ImpactAreasProps {
  areas: ImpactArea[];
}
