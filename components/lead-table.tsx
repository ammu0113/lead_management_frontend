"use client"

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ArrowDown, ChevronLeft, ChevronRight } from 'lucide-react';

interface Lead {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  country: string;
  status: string;
  submittedAt: string;
  visas: string[];
  linkedIn: string;
  additionalInfo: string;
}

interface LeadTableProps {
  leads: Lead[];
  updateLeadStatus: (leadId: number, newStatus: string) => void;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

export default function LeadTable({ leads, updateLeadStatus,currentPage, setCurrentPage }: LeadTableProps) {
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const leadsPerPage = 8;
  
  // Calculate pagination
  const indexOfLastLead = currentPage * leadsPerPage;
  const indexOfFirstLead = indexOfLastLead - leadsPerPage;
  const currentLeads = leads.slice(indexOfFirstLead, indexOfLastLead);
  const totalPages = Math.ceil(leads.length / leadsPerPage);
  
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleLeadClick = (lead: Lead) => {
    setSelectedLead(lead);
  };

  return (
    <div className="bg-white rounded-[20px] border border-gray-200">
      <Table>
      <TableHeader>
  <TableRow>
    <TableHead className="font-normal">
      <div className="flex items-center gap-2">
        Name <ArrowDown className="h-4 w-5" />
      </div>
    </TableHead>
    <TableHead className="font-normal">
      <div className="flex items-center gap-2">
        Submitted <ArrowDown className="h-4 w-5" />
      </div>
    </TableHead>
    <TableHead className="font-normal">
      <div className="flex items-center gap-2">
        Status <ArrowDown className="h-4 w-5" />
      </div>
    </TableHead>
    <TableHead className="font-normal">
      <div className="flex items-center gap-2">
        Country <ArrowDown className="h-4 w-5" />
      </div>
    </TableHead>
  </TableRow>
</TableHeader>

        <TableBody>
          {currentLeads.map((lead) => (
            <TableRow 
              key={lead.id}
              className="cursor-pointer hover:bg-gray-50"
              onClick={() => handleLeadClick(lead)}
            >
              <TableCell>
                <Dialog>
                  <DialogTrigger asChild>
                    <div className="font-normal">{lead.firstName} {lead.lastName}</div>
                  </DialogTrigger>
                  <DialogContent className="max-w-3xl">
                    <DialogHeader>
                      <DialogTitle className="text-xl">Lead Details</DialogTitle>
                      <DialogDescription>
                        View and manage lead information
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid grid-cols-2 gap-6 py-4">
                      <div>
                        <h3 className="font-semibold text-lg mb-4">Contact Information</h3>
                        <div className="space-y-3">
                          <div>
                            <p className="text-sm text-gray-500">Name</p>
                            <p>{lead.firstName} {lead.lastName}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Email</p>
                            <p>{lead.email}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Country</p>
                            <p>{lead.country}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">LinkedIn</p>
                            <a href={lead.linkedIn} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                              {lead.linkedIn}
                            </a>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Submitted At</p>
                            <p>{lead.submittedAt}</p>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-4">Case Information</h3>
                        <div className="space-y-3">
                          <div>
                            <p className="text-sm text-gray-500">Visas of Interest</p>
                            <div className="flex flex-wrap gap-2 mt-1">
                              {lead.visas.map((visa, index) => (
                                <span key={index} className="bg-gray-100 px-2 py-1 rounded text-sm">
                                  {visa}
                                </span>
                              ))}
                            </div>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Additional Information</p>
                            <p className="mt-1 whitespace-pre-wrap">{lead.additionalInfo}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Resume</p>
                            <a href="#" className="text-blue-600 hover:underline">Download Resume</a>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Current Status</p>
                            <div className="flex items-center gap-3 mt-2">
                              <span className={`px-2 py-1 rounded text-sm`}>
                                {lead.status === 'PENDING' ? 'Pending' : 'Reached Out'}
                              </span>
                              {lead.status === 'PENDING' && (
                                <Button 
                                  size="sm"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    updateLeadStatus(lead.id, 'REACHED_OUT');
                                  }}
                                >
                                  Mark as Reached Out
                                </Button>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </TableCell>
              <TableCell>{lead.submittedAt}</TableCell>
              <TableCell>
                <span className={`px-2 py-1 rounded text-sm`}>
                  {lead.status === 'PENDING' ? 'Pending' : 'Reached Out'}
                </span>
              </TableCell>
              <TableCell>{lead.country}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      
      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-end p-4">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="p-2 rounded-md hover:bg-gray-100 disabled:opacity-50"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`mx-1 px-3 py-1 rounded-md ${
                currentPage === page
                  ? 'rounded-sm border-2 border-black'
                  : 'hover:bg-gray-100'
              }`}
            >
              {page}
            </button>
          ))}
          
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="p-2 rounded-md hover:bg-gray-100 disabled:opacity-50"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      )}
    </div>
  );
}